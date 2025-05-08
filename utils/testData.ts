export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface TestUserCredentials {
  email: string;
  password: string;
}
export const newTestUser: User = {
  firstName: "John",
  lastName: "Doe",
  email: `john_${Date.now()}@example.com`,
  password: "Pass123",
};
export const testUser: TestUserCredentials = {
  email: "luckyguy2306@gmail.com",
  password: "test-ix1st9ytk",
};
export const projectName = `AutoProject_${Date.now()}`;
export const bonusData = {
  member: "Tester_Oleg Tester_Andrusiv",
  amount: "100",
  note: "Great job!",
};
