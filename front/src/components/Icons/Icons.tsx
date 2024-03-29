import { forwardRef } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import GridViewIcon from "@mui/icons-material/GridView";
import Groups2Icon from "@mui/icons-material/Groups2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReorderIcon from "@mui/icons-material/Reorder";
import Search from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ViewListIcon from "@mui/icons-material/ViewList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Delete,
    Email,
    Favorite,
    PersonAddAlt1,
    Image,
} from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";

interface IconProps {
    title?: string;
    titleId?: string;
    size?: string;
    iconColor?: string;
}

const Icons = {
    Account: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <AccountCircleIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Add: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <AddIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    AddPerson: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <PersonAddAlt1
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    AddPhoto: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <AddPhotoAlternateIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    ArrowBack: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ArrowBackIosNewIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    ArrowForward: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ArrowForwardIosIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Close: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <CloseIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Dashboard: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <SpaceDashboardIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    DeleteForever: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <DeleteForeverIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Delete: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Delete
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Dislike: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ThumbDownOffAltIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Edit: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <EditIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Email: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Email
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Favorite: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Favorite
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    FavoriteBorder: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <FavoriteBorder
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Grid: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <GridViewIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Groups: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Groups2Icon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Home: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <HomeIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Info: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <InfoIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Image: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Image
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Key: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <KeyIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Like: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ThumbUpOffAltIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    List: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ViewListIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Menu: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <MenuIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Message: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <EmailIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    MoreHoriz: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <MoreHorizIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Notifications: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <NotificationsIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Play: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <PlayCircleIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Projects: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <AccountTreeIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Reorder: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ReorderIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Search: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Search
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Settings: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <SettingsIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Share: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <ShareIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    SignOut: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <LogoutIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Team: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <Groups2Icon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    TrueFill: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <CheckCircleIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    User: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <PersonOutlineIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    Visibility: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <VisibilityIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
    VisibilityOff: forwardRef<SVGSVGElement, IconProps>((props, ref) => (
        <VisibilityOffIcon
            {...props}
            ref={ref}
            style={{ color: props.iconColor, fontSize: props.size }}
        />
    )),
};

export default Icons;
