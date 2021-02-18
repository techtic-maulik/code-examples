import { Controller, UseGuards, Get, Res, Request, HttpStatus, UnprocessableEntityException, Post, Body, Delete, Param} from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { DrawerService } from 'src/shared/services/drawer/drawer.service';

@Controller('api/drawer')
export class DrawerController {
    constructor(
        private drawerService: DrawerService,
    ) { }

    @Get('')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getLevel(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.drawerService.get(request)
            .then(async output => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: output,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @Get('all')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getAll(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.drawerService.getAll(request.query)
            .then(async output => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: output,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async updateUser(
        @Request() request: any,
        @Body() body: any,
        @Res() res: Response,
    ): Promise<any> {
        return await this.drawerService
            .createUpdate(body)
            .then(async reasons => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: reasons,
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    async delete(
        @Param('id') id,
        @Res() res: Response
    ): Promise<any> {

        return await this.drawerService
            .delete(id)
            .then(async reasons => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: 'Drawers deleted successfully',
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }
}
