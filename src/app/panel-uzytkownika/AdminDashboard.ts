class AdminDashboard {
  isVisible: boolean = true;

  // Manage products
  addProduct(product: any): void {};
  changeProduct(product: any): void {};
  hideProduct(product: any): void {};
  removeProduct(product: any): void {};

  // Manage reports
  getReports(): any { return "Not implemented yet." };
  replyToReports(report: any, reply: string): void {};

  // Manage opinions
  deleteOpinion(opinion: any, reason: string): void {};

  // BAN HAMMER!
  banUser(user: any, reason: string): void {};
}
