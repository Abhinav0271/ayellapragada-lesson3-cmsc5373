import { homePageView } from "../view/home_page.js";
import { PlayRecordPageView } from "../view/playrecord_page.js";
import { signOutFirebase } from "./firebase_auth.js";
import { routePathnames } from "./route_controller.js";

export function onClickHomeMenu(e){
    history.pushState(null, null, routePathnames.HOME);
    homePageView();
}

export function onClickPlayRecord(e){
    history.pushState(null, null, routePathnames.PLAYRECORD);
    PlayRecordPageView();
}
export async function onClickSignoutMenu(e){
    await signOutFirebase(e);
}