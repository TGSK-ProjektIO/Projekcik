class Profile {

  userId: string;
  profilePicture: string;
  nickname: string;
  description: string = "";
  isBanned: boolean = false;

  constructor(userId: string, profilePicture: string, nickname: string) {
    this.userId = userId;
    this.profilePicture = profilePicture;
    this.nickname = nickname;
  }

  getReviewedProducts(): string { return "Not implemented yet."; }
  getOpinions(): string { return "Not implemented yet."; }

}
