
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AddContactInput {
    user_id?: string;
    status?: string;
}

export class AddFundInput {
    token?: string;
    payment_gateway?: string;
    payment_data?: JSON;
    amount?: number;
}

export class AddMessageInput {
    user_id?: string;
    message?: string;
}

export class AddStackUserInput {
    post_id?: string;
    staked_amount?: number;
    markup_amount?: number;
}

export class AvailabilityInput {
    _id?: string;
    start: Date;
    end: Date;
}

export class BookingRequestInput {
    user_id: string;
    start: Date;
    end: Date;
    amount: number;
}

export class ChangeStatusInput {
    id: string;
    status: string;
}

export class DataTableFilters {
    name?: string;
    type?: string;
}

export class DataTableOrder {
    direction?: string;
    name?: string;
    type?: string;
}

export class EmailTemplateDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class EmailTemplateInput {
    _id?: string;
    subject?: string;
    slug?: string;
    name?: string;
    body?: string;
}

export class FaqDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class FaqInput {
    _id?: string;
    question?: string;
    answer?: string;
}

export class GetAvailabilityInput {
    _id?: string;
    user_id?: string;
    status?: string[];
    start: Date;
    end: Date;
}

export class GetBookingRequestInput {
    _id?: string;
    user_id?: string;
    player_id?: string;
    status?: string[];
    filter_in?: DataTableFilters[];
    filter?: string;
    start?: Date;
    end?: Date;
    limit?: number;
    page?: number;
}

export class GetPostsInput {
    limit?: number;
    page?: number;
    type?: string;
    user_id?: string;
    sport_type_id?: string;
    filter?: string;
    filter_in?: DataTableFilters[];
    amount?: string[];
}

export class InvoiceDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    post_id?: string;
    start_date?: Date;
    end_date?: Date;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
    user_id?: string;
}

export class InvoiceTableInput {
    limit?: number;
    page?: number;
}

export class LoginInput {
    email: string;
    password: string;
    user_type?: string;
}

export class MassInput {
    towhom?: string;
    content?: string;
    subject?: string;
    selectedUsers?: JSON;
    selectedShark?: JSON;
}

export class MessageInput {
    page?: number;
    limit?: number;
    user_id?: string;
}

export class MultipleUser {
    email?: string;
}

export class NotificationsInput {
    page?: number;
    limit?: number;
}

export class NotificationTemplateDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class NotificationTemplateInput {
    _id?: string;
    title?: string;
    slug?: string;
    name?: string;
    body?: string;
}

export class PagesDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class PagesInput {
    _id?: string;
    name?: string;
    title?: string;
    slug?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keyword?: string;
}

export class PaidToPlayerInput {
    post_id?: string;
    reason?: string;
    amount?: string;
}

export class PasswordResetInput {
    token: string;
    password: string;
}

export class PostResultInput {
    _id?: string;
    user_id?: string;
    winning_total_amount?: number;
    winning_status?: string;
    total_staked_amount?: number;
    user_winning_amount?: number;
    player_winning_amount?: number;
    admin_total_commission?: number;
}

export class PostsDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class PostsInput {
    _id?: string;
    user_id?: string;
    title?: string;
    description?: string;
    sport_type_id?: string;
    total_staked_amount?: number;
    game_amount?: number;
    player_amount?: number;
    closing_time?: Date;
    is_streaming?: boolean;
    sold_percentage?: number;
    stream_type?: string;
    stream_url?: string;
    status?: string;
    markup_amount?: number;
}

export class ReplySupportTicketInput {
    _id?: string;
    file?: string;
    message?: string;
}

export class SaveLocationInput {
    latitude: string;
    longitude: string;
    ipAddress: string;
    timestamp: string;
}

export class SendContactUSInput {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export class SliderDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class SliderlInput {
    _id?: string;
    image?: string;
}

export class SocialUserInput {
    provider?: string;
    token?: string;
    email?: string;
    name?: string;
    user_type?: string;
    sport_type_id?: string;
}

export class SportTypeDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class SportTypeInput {
    _id?: string;
    name?: string;
    slug?: string;
    status?: string;
}

export class SupportTicketDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
    type?: string;
}

export class SupportTicketInput {
    subject?: string;
    file?: string;
    message?: string;
}

export class TransactionDataTableInput {
    transactions_type?: string;
    limit?: number;
    page?: number;
    search?: number;
    user_id?: string;
    post_id?: string;
    start_date?: Date;
    end_date?: Date;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class TransactionStatistics {
    year?: number;
    month?: string;
}

export class TransactionTableInput {
    page?: number;
    limit?: number;
}

export class TutorialDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class TutorialInput {
    _id?: string;
    title?: string;
    description?: string;
    file?: string;
    link?: string;
}

export class UpdateProfileInput {
    first_name?: string;
    last_name?: string;
    user_type?: string;
    email?: string;
    dob?: string;
    gender?: string;
    profile_pic?: string;
    about?: string;
    sport_type_id?: string;
    coaching_amount?: number;
    shark_commission?: number;
    sport_types?: JSON;
}

export class UpdateSportOrderInput {
    sportTypeData?: JSON;
}

export class UserFollowDataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
    player_id?: string;
    user_id?: string;
}

export class UserInput {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    sport_type_id?: string;
    user_type?: string;
    password?: string;
    dob?: string;
    profile_pic?: string;
    about?: string;
    coaching_amount?: string;
    gender?: string;
    shark_commission?: string;
    status?: string;
    sport_types?: JSON;
}

export class UsersDataTableInput {
    user_type?: string;
    sport_type_id?: string;
    limit?: number;
    page?: number;
    search?: number;
    filter?: string;
    filter_in?: DataTableFilters[];
    order?: DataTableOrder;
}

export class WebhookResponseInput {
    id?: string;
    status?: string;
}

export class Withdraw {
    payment_gateway?: string;
    email?: string;
    amount?: number;
}

export class WithdrawPlayerInput {
    amount?: number;
    user_id?: string;
}

export class AddPostResponse {
    data?: Post;
    message?: string;
}

export class AppInit {
    user?: User;
    settings?: JSON;
    sport_types?: JSON;
}

export class BalanceDataList {
    year?: string;
    month?: string;
    day?: string;
    closing_balance?: string;
}

export class BuyStackResponse {
    post?: Post;
    transaction?: Transaction;
    message?: string;
}

export class Contact {
    _id?: string;
    user_id?: string;
    user?: User;
    contact_id?: string;
    contact?: User;
    status?: string;
    unread?: number;
    last_message?: Message;
    created_at?: Date;
    updated_at?: Date;
}

export class DataTableInput {
    limit?: number;
    page?: number;
    search?: number;
    order_by?: string;
    order?: string;
}

export class EmailTemplate {
    _id?: string;
    subject?: string;
    slug?: string;
    name?: string;
    body?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class EmailTemplateList {
    data?: EmailTemplate[];
    meta?: PaginationMeta;
}

export class Events {
    id?: string;
    start: Date;
    end: Date;
    status?: string;
    color?: string;
    amount?: string;
    user?: User;
    booking_user?: User;
}

export class Faq {
    _id?: string;
    question?: string;
    answer?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class FaqList {
    data?: Faq[];
    meta?: PaginationMeta;
}

export class Invoice {
    _id?: number;
    user_id?: string;
    file?: string;
    file_name?: string;
    post_id?: string;
    post?: PostList;
    user?: User;
    amount?: number;
    created_at?: Date;
    updated_at?: Date;
}

export class InvoiceList {
    data?: Invoice[];
    meta?: PaginationMeta;
}

export class LoginResponse {
    status?: number;
    user?: User;
    token?: string;
}

export class Message {
    _id?: string;
    user_id?: string;
    user?: User;
    contact_id?: string;
    contact?: User;
    message?: string;
    status?: string;
    data?: JSON;
    created_at?: Date;
    updated_at?: Date;
}

export class MessageList {
    data?: Message[];
    meta?: PaginationMeta;
}

export abstract class IMutation {
    abstract addMessage(input: AddMessageInput): Message | Promise<Message>;

    abstract addContact(input: AddContactInput): Contact | Promise<Contact>;

    abstract markAsRead(user_id: string): Contact | Promise<Contact>;

    abstract addEmailTemplate(input: EmailTemplateInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteEmailTemplate(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract saveFaq(input?: FaqInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteFaq(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract addNotificationTemplate(input: NotificationTemplateInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteNotificationTemplate(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract readNotification(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract savePage(input?: PagesInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deletePage(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract sendContactUS(input?: SendContactUSInput): SuccessResponse | Promise<SuccessResponse>;

    abstract addPost(input: PostsInput): AddPostResponse | Promise<AddPostResponse>;

    abstract deletePost(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract addMyPost(input: PostsInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteMyPost(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract updatePostResult(input: PostResultInput): SuccessResponse | Promise<SuccessResponse>;

    abstract paidToPlayer(input: PaidToPlayerInput): SuccessResponse | Promise<SuccessResponse>;

    abstract refundToUser(input: PaidToPlayerInput): SuccessResponse | Promise<SuccessResponse>;

    abstract refundToUserCoaching(availabityId: string): SuccessResponse | Promise<SuccessResponse>;

    abstract saveSetting(key: string, value?: string): SuccessResponse | Promise<SuccessResponse>;

    abstract saveSliderImage(input?: SliderlInput): SuccessResponse | Promise<SuccessResponse>;

    abstract saveSettings(settings: JSON): JSON | Promise<JSON>;

    abstract deleteImage(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract addSportType(input: SportTypeInput): SuccessResponse | Promise<SuccessResponse>;

    abstract updateSportOrder(input: UpdateSportOrderInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteSportType(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract addNewSupportTicket(input?: SupportTicketInput): SuccessResponse | Promise<SuccessResponse>;

    abstract replySupportTicket(input?: ReplySupportTicketInput): SupportTicketMsg | Promise<SupportTicketMsg>;

    abstract saveTutorial(input?: TutorialInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteTutorial(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract setFollow(player_id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract login(input: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract register(input: UserInput): LoginResponse | Promise<LoginResponse>;

    abstract socialLogin(input: SocialUserInput): LoginResponse | Promise<LoginResponse>;

    abstract forgotPassword(email: string): SuccessResponse | Promise<SuccessResponse>;

    abstract setPassword(input: PasswordResetInput): SuccessResponse | Promise<SuccessResponse>;

    abstract addUser(input: UserInput): SuccessResponse | Promise<SuccessResponse>;

    abstract deleteUser(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract changePassword(old_password: string, password: string): SuccessResponse | Promise<SuccessResponse>;

    abstract updateProfile(input: UpdateProfileInput): UserResponse | Promise<UserResponse>;

    abstract addUpdateAvailability(input: AvailabilityInput): Events[] | Promise<Events[]>;

    abstract deleteAvailability(id: string): SuccessResponse | Promise<SuccessResponse>;

    abstract confirmBooking(input: BookingRequestInput): Events | Promise<Events>;

    abstract massEmail(input: MassInput): SuccessResponse | Promise<SuccessResponse>;

    abstract saveLocation(input?: SaveLocationInput): SuccessResponse | Promise<SuccessResponse>;

    abstract addFund(input?: AddFundInput): SuccessResponse | Promise<SuccessResponse>;

    abstract buyStack(input?: AddStackUserInput): BuyStackResponse | Promise<BuyStackResponse>;

    abstract withdraw(input?: Withdraw): SuccessResponse | Promise<SuccessResponse>;

    abstract withdrawPlayer(input?: WithdrawPlayerInput): SuccessResponse | Promise<SuccessResponse>;

    abstract webhookResponse(id: string, status: string): SuccessResponse | Promise<SuccessResponse>;
}

export class Notification {
    _id?: string;
    body?: string;
    user_id?: string;
    data?: JSON;
    user?: User;
    to_user?: User;
    created_at?: Date;
    read_at?: Date;
}

export class NotificationCount {
    data?: number;
}

export class NotificationList {
    data?: Notification[];
    meta?: PaginationMeta;
}

export class NotificationTemplate {
    _id?: string;
    title?: string;
    slug?: string;
    name?: string;
    body?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class NotificationTemplateList {
    data?: NotificationTemplate[];
    meta?: PaginationMeta;
}

export class Pages {
    _id?: string;
    name?: string;
    title?: string;
    slug?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keyword?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class PagesList {
    data?: Pages[];
    meta?: PaginationMeta;
}

export class PaginationEvents {
    data?: Events[];
    meta?: PaginationMeta;
}

export class PaginationMeta {
    from?: number;
    to?: number;
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
}

export class Post {
    _id?: string;
    user_id?: string;
    title?: string;
    sport_type_id?: string;
    description?: string;
    total_staked_amount?: number;
    game_amount?: number;
    player_amount?: number;
    total_won_amount?: number;
    total_get_amount?: number;
    gap_amount?: number;
    closing_time?: Date;
    stream_type?: string;
    stream_url?: string;
    is_streaming?: boolean;
    sold_percentage?: number;
    sold_total?: number;
    markup_amount?: number;
    player_staked_amount?: string;
    player_won_amount?: string;
    status?: string;
    paid_to_player?: boolean;
    user?: User;
    stack_users?: StackUser[];
    sport_type?: SportType;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export class PostList {
    title?: string;
    description?: string;
    data?: Post[];
    meta?: PaginationMeta;
}

export abstract class IQuery {
    abstract init(): AppInit | Promise<AppInit>;

    abstract getMessages(input?: MessageInput): MessageList | Promise<MessageList>;

    abstract getContacts(): Contact[] | Promise<Contact[]>;

    abstract getContact(id: string): Contact | Promise<Contact>;

    abstract emailTemplates(input?: EmailTemplateDataTableInput): EmailTemplateList | Promise<EmailTemplateList>;

    abstract emailTemplate(id: string): EmailTemplate | Promise<EmailTemplate>;

    abstract getEmailTemplates(): EmailTemplate[] | Promise<EmailTemplate[]>;

    abstract getFaq(input?: FaqDataTableInput): FaqList | Promise<FaqList>;

    abstract getByUser(input?: InvoiceTableInput): InvoiceList | Promise<InvoiceList>;

    abstract getAllInvoices(input?: InvoiceDataTableInput): InvoiceList | Promise<InvoiceList>;

    abstract createInvoice(): InvoiceList | Promise<InvoiceList>;

    abstract notificationTemplates(input?: NotificationTemplateDataTableInput): NotificationTemplateList | Promise<NotificationTemplateList>;

    abstract notificationTemplate(id: string): NotificationTemplate | Promise<NotificationTemplate>;

    abstract getNotifications(input?: NotificationsInput): NotificationList | Promise<NotificationList>;

    abstract getNotificationCount(): NotificationCount | Promise<NotificationCount>;

    abstract readAllNotifications(): SuccessResponse | Promise<SuccessResponse>;

    abstract getPages(input?: PagesDataTableInput): PagesList | Promise<PagesList>;

    abstract getPage(id: string): Pages | Promise<Pages>;

    abstract getPageBySlug(slug: string): Pages | Promise<Pages>;

    abstract getMyPost(input?: GetPostsInput): PostList | Promise<PostList>;

    abstract getPost(id: string): Post | Promise<Post>;

    abstract getPosts(input?: GetPostsInput): PostList | Promise<PostList>;

    abstract getBuyerPosts(input?: GetPostsInput): PostList | Promise<PostList>;

    abstract getAllPost(input?: PostsDataTableInput): PostList | Promise<PostList>;

    abstract getAllPostList(): Post[] | Promise<Post[]>;

    abstract getSettings(): JSON | Promise<JSON>;

    abstract getSliderImages(input?: SliderDataTableInput): SliderList | Promise<SliderList>;

    abstract getAllSliderImages(): Slider[] | Promise<Slider[]>;

    abstract sportTypes(input?: SportTypeDataTableInput): SportTypeList | Promise<SportTypeList>;

    abstract sportType(id: string): SportType | Promise<SportType>;

    abstract getSportTypes(): SportType[] | Promise<SportType[]>;

    abstract getActiveSportTypes(type?: boolean): SportType[] | Promise<SportType[]>;

    abstract getAdminProfit(year?: number): SuccessResponse | Promise<SuccessResponse>;

    abstract getGameWisePlayerStatistics(): SuccessResponse | Promise<SuccessResponse>;

    abstract getGameWisePostStatistics(): SuccessResponse | Promise<SuccessResponse>;

    abstract getSupportTicketTotal(): TotalList | Promise<TotalList>;

    abstract getStatusWiseUsers(): SuccessResponse | Promise<SuccessResponse>;

    abstract getSupportTicketList(input?: SupportTicketDataTableInput): SupportTicketList | Promise<SupportTicketList>;

    abstract getSupportTicket(id: string): SupportTicket | Promise<SupportTicket>;

    abstract changeStatus(input?: ChangeStatusInput): SupportTicket | Promise<SupportTicket>;

    abstract getTutorials(input?: TutorialDataTableInput): TutorialList | Promise<TutorialList>;

    abstract getTutorial(id: string): Tutorial | Promise<Tutorial>;

    abstract followingList(input?: UserFollowDataTableInput): UserFollowList | Promise<UserFollowList>;

    abstract isFollow(player_id?: string): SuccessResponse | Promise<SuccessResponse>;

    abstract users(input?: UsersDataTableInput): UserList | Promise<UserList>;

    abstract user(id: string): User | Promise<User>;

    abstract getPlayers(user_type?: string): User[] | Promise<User[]>;

    abstract getStatistics(user_id?: string): StatisticsList | Promise<StatisticsList>;

    abstract getStakeStatistics(user_id?: string): StakeStatisticsList | Promise<StakeStatisticsList>;

    abstract getTransactionStatistics(input?: TransactionStatistics): TransactionStatisticsList | Promise<TransactionStatisticsList>;

    abstract getUserStatistics(sport_id?: string): UserDataList | Promise<UserDataList>;

    abstract getSportTypeStatistics(user_id?: string): SportTypeDataList[] | Promise<SportTypeDataList[]>;

    abstract getAvailability(input: GetAvailabilityInput): Events[] | Promise<Events[]>;

    abstract getUserAvailability(input: GetAvailabilityInput): Events[] | Promise<Events[]>;

    abstract getBookingRequestInput(input?: GetBookingRequestInput): PaginationEvents | Promise<PaginationEvents>;

    abstract getAdminDashboard(): SuccessResponse | Promise<SuccessResponse>;

    abstract testFunction(): SuccessResponse | Promise<SuccessResponse>;

    abstract massEmailTest(): SuccessResponse | Promise<SuccessResponse>;

    abstract saveFirebaseToken(token?: string): SuccessResponse | Promise<SuccessResponse>;

    abstract getUserSportType(): UserSportTypes[] | Promise<UserSportTypes[]>;

    abstract getPaymentHistory(input?: TransactionTableInput): TransactionList | Promise<TransactionList>;

    abstract getAllPaymentHistory(input?: TransactionDataTableInput): TransactionList | Promise<TransactionList>;
}

export class Slider {
    _id?: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class SliderList {
    data?: Slider[];
    meta?: PaginationMeta;
}

export class SportType {
    name?: string;
    _id?: string;
    slug?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class SportTypeDataList {
    name?: string;
    total?: string;
    won_total?: string;
}

export class SportTypeList {
    data?: SportType[];
    meta?: PaginationMeta;
}

export class StackUser {
    _id?: string;
    post_id?: string;
    user_id?: string;
    staked_amount?: number;
    won_amount?: number;
    user?: User;
    created_at?: Date;
    updated_at?: Date;
}

export class StakeStatisticsList {
    active?: string;
    pending_result?: string;
    won?: string;
    loss?: string;
    inactive?: string;
}

export class StatisticsList {
    investment?: string;
    amount?: string;
    totalWithdraw?: string;
    availbleBalance?: string;
}

export abstract class ISubscription {
    abstract messageAdded(): Message | Promise<Message>;

    abstract messageTyping(): Contact | Promise<Contact>;

    abstract messageRead(): Contact | Promise<Contact>;
}

export class SuccessResponse {
    status?: string;
    message?: string;
    data?: JSON;
}

export class SupportTicket {
    _id?: string;
    user_id?: string;
    subject?: string;
    status?: string;
    user?: User;
    closed_by_user?: User;
    user_read?: boolean;
    admin_read?: boolean;
    messages?: SupportTicketMsg[];
    created_at?: Date;
    updated_at?: Date;
}

export class SupportTicketFile {
    _id?: string;
    file?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class SupportTicketList {
    data?: SupportTicket[];
    meta?: PaginationMeta;
}

export class SupportTicketMsg {
    _id?: string;
    user_id?: string;
    message?: string;
    user?: User;
    file?: SupportTicketFile;
    created_at?: Date;
    updated_at?: Date;
}

export class TotalList {
    open?: string;
    closed?: string;
    unread?: string;
}

export class Transaction {
    _id?: string;
    user_id?: string;
    user?: User;
    amount?: number;
    closing_balance?: number;
    description?: string;
    transactions_type?: string;
    data?: JSON;
    getway_transactions_id?: string;
    getway_type?: string;
    status?: string;
    created_at?: Date;
}

export class TransactionDataList {
    year?: string;
    month?: string;
    day?: string;
    staked_amount?: string;
    won_amount?: string;
}

export class TransactionList {
    data?: Transaction[];
    meta?: PaginationMeta;
}

export class TransactionStatisticsList {
    balanceData?: BalanceDataList[];
    transactionData?: TransactionDataList[];
}

export class Tutorial {
    _id?: string;
    title?: string;
    description?: string;
    file?: string;
    link?: string;
    created_at?: Date;
    updated_at?: Date;
}

export class TutorialList {
    data?: Tutorial[];
    meta?: PaginationMeta;
}

export class User {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    email_verified_at?: Date;
    dob?: Date;
    gender?: string;
    status?: string;
    sport_type_id?: string;
    sport_type?: SportType;
    user_type?: JSON;
    wallet_amount?: string;
    coaching_amount?: number;
    shark_commission?: number;
    created_at?: Date;
    updated_at?: Date;
    profile_pic?: string;
    about?: string;
    password_reset?: JSON;
    userSportTypes?: UserSportTypes[];
}

export class UserDataList {
    userData?: UserDataListOutput[];
}

export class UserDataListOutput {
    staked_amount?: string;
    full_name?: string;
    won_amount?: string;
}

export class UserFollow {
    _id?: string;
    player_id?: string;
    player?: User;
    user_id?: string;
    user?: User;
    created_at?: Date;
    updated_at?: Date;
}

export class UserFollowList {
    data?: UserFollow[];
    meta?: PaginationMeta;
}

export class UserList {
    data?: User[];
    meta?: PaginationMeta;
}

export class UserResponse {
    status?: number;
    user?: User;
}

export class UserSportTypes {
    user_id?: string;
    sport_type_id?: string;
    sport_type?: SportType;
}

export type JSON = any;
export type Upload = any;
