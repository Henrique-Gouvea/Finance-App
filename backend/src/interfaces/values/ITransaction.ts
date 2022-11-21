export interface ITransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  debitedBalanceUpdated: number;
  creditedBalanceUpdated: number;
}
