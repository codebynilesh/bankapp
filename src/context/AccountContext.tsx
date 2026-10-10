import { createContext, ReactNode, useContext, useState } from "react";

export type TransactionType = "Initial" | "Deposit" | "Transfer";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  recipient?: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  transactions: Transaction[];
}

export interface NewAccountInput {
  name: string;
  email: string;
  phone: string;
}

interface AccountContextType {
  account: Account | null;
  createAccount: (input: NewAccountInput) => void;
  depositMoney: (amount: number) => boolean;
  transferMoney: (amount: number, recipient: string) => boolean;
  signIn: (identifier: string) => string | null;
  signOut: () => void;
}

const STARTING_BALANCE = 1000;

const DEMO_ACCOUNT: Account = {
  id: "demo",
  name: "Demo User",
  email: "demo@bankapp.com",
  phone: "9876543210",
  accountNumber: "1234567890",
  accountType: "Savings",
  balance: STARTING_BALANCE,
  transactions: [],
};

function generateAccountNumber(): string {
  let digits = "";
  for (let i = 0; i < 10; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
}

function today(): string {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([DEMO_ACCOUNT]);
  const [currentId, setCurrentId] = useState<string | null>(DEMO_ACCOUNT.id);

  const account = accounts.find((a) => a.id === currentId) ?? null;

  const updateCurrent = (apply: (acc: Account) => Account) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === currentId ? apply(a) : a)),
    );
  };

  const createAccount = ({ name, email, phone }: NewAccountInput) => {
    const newAccount: Account = {
      id: `acc-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      accountNumber: generateAccountNumber(),
      accountType: "Savings",
      balance: STARTING_BALANCE,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: "Initial",
          amount: STARTING_BALANCE,
          date: today(),
        },
      ],
    };
    setAccounts((prev) => [...prev, newAccount]);
    setCurrentId(newAccount.id);
  };

  const depositMoney = (amount: number) => {
    if (!account || !Number.isFinite(amount) || amount <= 0) return false;
    updateCurrent((acc) => ({
      ...acc,
      balance: acc.balance + amount,
      transactions: [
        ...acc.transactions,
        { id: `tx-${Date.now()}`, type: "Deposit", amount, date: today() },
      ],
    }));
    return true;
  };

  const transferMoney = (amount: number, recipient: string) => {
    if (!account || !Number.isFinite(amount) || amount <= 0) return false;
    if (!recipient.trim()) return false;
    if (amount > account.balance) return false;
    updateCurrent((acc) => ({
      ...acc,
      balance: acc.balance - amount,
      transactions: [
        ...acc.transactions,
        {
          id: `tx-${Date.now()}`,
          type: "Transfer",
          amount,
          date: today(),
          recipient: recipient.trim(),
        },
      ],
    }));
    return true;
  };

  const signIn = (identifier: string): string | null => {
    const value = identifier.trim().toLowerCase();
    if (!value) return "Enter your phone number or email.";
    const match = accounts.find(
      (a) =>
        a.phone.toLowerCase() === value || a.email.toLowerCase() === value,
    );
    if (!match) return "No account found for that phone or email.";
    setCurrentId(match.id);
    return null;
  };

  const signOut = () => setCurrentId(null);

  return (
    <AccountContext.Provider
      value={{
        account,
        createAccount,
        depositMoney,
        transferMoney,
        signIn,
        signOut,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextType {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
