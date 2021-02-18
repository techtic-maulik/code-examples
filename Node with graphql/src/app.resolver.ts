import { Resolver, Query} from '@nestjs/graphql';
import { UserService } from './shared/service/user.service';
import { User } from './user/user.entity';
import { JwtToken } from './common/modules/auth';
import { SportTypeService } from './shared/service/sport-type.service';
import { SettingsService } from './shared/service/setting.service';

class AppInit {
    user?: User;
    settings?: any = {};
}

@Resolver('App')
export class AppResolver {
    constructor(
        private readonly userService: UserService,
        private readonly sportTypeService: SportTypeService,
        private readonly settingService: SettingsService,
    ) { }

    @Query('init')
    async init(@JwtToken() token): Promise<any> {
        //let token =  context.jwtToken;
        let user = null;

        try {
            user = this.userService.getCurrentUsers(token);
        } catch (error) {
            
        }
       
        let sport_types = await this.sportTypeService.getAll();

        let settings = await this.settingService.getSettings();
        return {
            user,
            settings,
            sport_types
        };
    }

}