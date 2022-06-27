import { combineReducers } from "redux";
import auth from "./auth";
import customer from "./customer";
import pegawai from "./pegawai";
import transaction from "./transaksi";
import roles from "./role";
import promo from "./promo";
import mitra from "./mitra";
import mobil from "./mobil";
import driver from "./driver";
import snackbar from "./snackbars";
import jadwal from "./jadwal";
import detailJadwal from "./detailJadwal";



export default combineReducers({
    auth,
    snackbar,
    pegawai,
    customer,
    roles,
    promo,
    mitra,
    mobil,
    driver,
    transaction,
    jadwal,
    detailJadwal,
})