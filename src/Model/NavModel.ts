import { MouseEvent, ReactElement } from "react";
import { PagesInterface } from "./TablePagesAndModalModel";

export interface NavInterface extends PagesInterface
{
    AvatarSize: string;
}

export interface NavSyntaxInterface
{
    fontSize?: number;
    transition?: string;
    bgcolor?: string;
    color?: string;
    '&:hover'?: {
        color: string;
    };
}

export interface MenuItemSyntaxInterface
{
    margin: number;
    padding: number;
}

interface ProfileItemInterface
{
    NavSyntax: NavSyntaxInterface;
    MenuItemSyntax: MenuItemSyntaxInterface;
}

export interface ProfileMenuInterface extends NavInterface, ProfileItemInterface
{
    username:string;
    anchorElUser: HTMLElement | null;
    handleUserMenu: (event: MouseEvent<HTMLElement>) => void;
}

export interface NavMenuInterface extends NavInterface, ProfileItemInterface
{
    anchorElNav: HTMLElement | null;
    handleNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface MenuItemInterface
{
    pages: { name: string, clickEvent:() => void, icon: ReactElement }[]
}