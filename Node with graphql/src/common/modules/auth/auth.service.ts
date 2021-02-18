import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }


    fromUser(user): string {
        return this.jwtService.sign({ _id: user._id, email: user.email, user_type: user.user_type, wallet_amount : user.wallet_amount})
    }

    verify(token: string) {
        if (token && token.split(' ')[0] === 'Bearer') {
            const jwt = token.split(' ')[1];
            return this.jwtService.verify(jwt);
        } else {
            return this.jwtService.verify(token);
        }
    }

}
