import api from './baseApi';
import type { AuthUser } from '../types/content';

export type MoneySource = {
  id: number;
  name: string;
  description?: string | null;
  createdAt: string;
};

export type CashFlow = {
  id: number;
  sourceId: number;
  sourceName: string;
  amount: number;
  type: 'IN' | 'OUT';
  note?: string | null;
  occurredAt: string;
  createdAt: string;
};

export type DailyReport = {
  date: string;
  ordersIncome: number;
  cashIn: number;
  cashOut: number;
  totalIncome: number;
  totalExpense: number;
  net: number;
};

export async function fetchUsers(): Promise<AuthUser[]> {
  const { data } = await api.get<{ success: boolean; data: { users: AuthUser[] } }>(
    '/admin/users'
  );
  return data.data.users;
}

export async function fetchMoneySources(): Promise<MoneySource[]> {
  const { data } = await api.get<{ success: boolean; data: { sources: MoneySource[] } }>(
    '/admin/money-sources'
  );
  return data.data.sources;
}

export async function createMoneySource(payload: {
  name: string;
  description?: string;
}): Promise<MoneySource> {
  const { data } = await api.post<{ success: boolean; data: { source: MoneySource } }>(
    '/admin/money-sources',
    payload
  );
  return data.data.source;
}

export async function updateMoneySource(
  id: number,
  payload: { name: string; description?: string }
): Promise<MoneySource> {
  const { data } = await api.put<{ success: boolean; data: { source: MoneySource } }>(
    `/admin/money-sources/${id}`,
    payload
  );
  return data.data.source;
}

export async function deleteMoneySource(id: number): Promise<void> {
  await api.delete(`/admin/money-sources/${id}`);
}

export async function fetchCashFlows(params?: {
  from?: string;
  to?: string;
}): Promise<CashFlow[]> {
  const { data } = await api.get<{ success: boolean; data: { flows: CashFlow[] } }>(
    '/admin/cash-flows',
    { params }
  );
  return data.data.flows;
}

export async function createCashFlow(payload: {
  sourceId: number;
  amount: number;
  type: 'IN' | 'OUT';
  note?: string;
  occurredAt?: string;
}): Promise<CashFlow> {
  const { data } = await api.post<{ success: boolean; data: { cashFlow: CashFlow } }>(
    '/admin/cash-flows',
    payload
  );
  return data.data.cashFlow;
}

export async function deleteCashFlow(id: number): Promise<void> {
  await api.delete(`/admin/cash-flows/${id}`);
}

export async function fetchDailyReport(dateIso: string): Promise<DailyReport> {
  const { data } = await api.get<{ success: boolean; data: DailyReport }>(
    '/admin/report/daily',
    { params: { date: dateIso } }
  );
  return data.data;
}


