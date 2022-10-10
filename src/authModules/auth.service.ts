import {
  HttpException,
  Injectable,
  HttpCode,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { userData } from "../DataStorage/user.mock";

@Injectable()
export class AuthService {
  userDetails = userData;

  getAllUsers(): Promise<any> {
    return new Promise((resolve) => {
      if (!this.userDetails && !this.userDetails[0].users) {
        throw new HttpException("User Data is not present", 404);
      }
      resolve(this.userDetails[0].users);
    });
  }

  loginWithCredentials(user: any, token: any): Promise<any> {
    return new Promise((resolve) => {
      let currentUserData = {
        emailAddress: user.emailId,
        userId: Number(user.userID),
      };
      let userArray = this.userDetails[0].users;
      let data = userArray.find(
        (element) =>
          element.emailAddress === currentUserData.emailAddress &&
          element.userId === currentUserData.userId
      );

      if (!Boolean(data)) {
        // resolve({ message: "User Data is not present", status: 404 });
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: "This is a custom exception message",
          },
          HttpStatus.FORBIDDEN
        );
      }
      let finalDataObject = {
        message: "user is present",
        userData: data,
        token: token,
      };
      resolve(finalDataObject);
    });
  }

  authTokenValidate(userData: any) {
    let filterData = this.userDetails[0].users.find(
      (ele) =>
        ele.userId === Number(userData.userID) &&
        ele.emailAddress === userData.emailId
    );
    return filterData;
  }
}
