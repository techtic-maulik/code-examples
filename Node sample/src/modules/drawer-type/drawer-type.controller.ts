import { Controller, UseGuards, Get, Res, Request, HttpStatus, UnprocessableEntityException, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { DrawerTypeService } from 'src/shared/services/drawer-type/drawer-type.service';

@Controller('api/drawers-type')
export class DrawerTypeController {
    constructor(
        private drawerTypeService: DrawerTypeService,
    ) { }
    
    @Get('all')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getAll(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.drawerTypeService.getDrawersTypeOptions()
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

    @Get('')
    @ApiOkResponse({ description: 'Successfully authenticated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async getLevel(@Request() request: any, @Res() res: Response): Promise<any> {
        return await this.drawerTypeService.getAll(request.query)
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
        return await this.drawerTypeService
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

        return await this.drawerTypeService
            .delete(id)
            .then(async reasons => {
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    data: 'Type deleted successfully',
                });
            })
            .catch((error: any) => {
                throw new UnprocessableEntityException(error);
            });
    }
}
