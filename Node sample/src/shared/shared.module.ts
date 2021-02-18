import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/entity/user.entity';
import { Services } from './services';
import { Topics } from 'src/modules/entity/topics.entity';
import { UserHasRole } from 'src/modules/entity/userHasRole.entity';
import { Miscellaneous } from 'src/modules/entity/miscellaneous.entity';
import { Role } from 'src/modules/entity/role.entity';
import { DeviceTokens } from 'src/modules/entity/deviceTokens.entity';
import { Level } from 'src/modules/entity/level.entity';
import { Quiz } from 'src/modules/entity/quiz.entity';
import { UserQuiz } from 'src/modules/entity/userQuiz.entity';
import { SubtopicUserRead } from 'src/modules/entity/subtopic_user_read.entity';
import { UserRecentDrawerHistory } from 'src/modules/entity/user_recent_drawer_history.entity';
import { LevelTopic } from 'src/modules/entity/level_topic.entity';
import { UserProgress } from 'src/modules/entity/user_progress.entity';
import { SimilarStatements } from 'src/modules/entity/statement.entity';
import { UserRecentHistory } from 'src/modules/entity/user_recent_history.entity';
import { Drawers } from 'src/modules/entity/drawer.entity';
import { Notification } from 'src/modules/entity/notification.entity';
import { UserNotification } from 'src/modules/entity/user_notification.entity';
import { QuizHeader } from 'src/modules/entity/quiz_header.entity';
import { Header } from 'src/modules/entity/header.entity';
import { Setting } from 'src/modules/entity/settings.entity';
import { DrawersType } from 'src/modules/entity/drawer_type.entity';
import { DrawersSimilarStatement } from 'src/modules/entity/drawer_similar_statement.entity';
import { Country } from 'src/modules/entity/country.entity';
import { StatementQuiz } from 'src/modules/entity/statement_quiz.entity';

const Entity = [
  DeviceTokens,
  Level,
  Miscellaneous,
  Role,
  Quiz,
  Topics,
  User,
  UserHasRole,
  UserQuiz,
  SubtopicUserRead,
  UserRecentDrawerHistory,
  LevelTopic,
  UserProgress,
  SimilarStatements,
  UserRecentHistory,
  Drawers,
  Notification,
  UserNotification,
  QuizHeader,
  Header,
  Setting,
  DrawersType,
  DrawersSimilarStatement,
  Country,
  StatementQuiz,
];

@Module({
  imports: [TypeOrmModule.forFeature(Entity)],
  exports: [...Services, TypeOrmModule.forFeature(Entity)],
  providers: [
    ...Services
  ],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [...Services],
    };
  }
}
