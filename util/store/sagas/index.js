import {all} from "redux-saga/effects"
import {watchUpdatePegawai, watchCreatePegawai, watchDeletePegawai, watchGet as wgPegawai} from "./pegawai";
import {watchCreatePromo, watchDeletePromo, watchGet as wgPromo, watchUpdatePromo} from "./promo";
import {watchCreateMitra, watchDeleteMitra, watchGet as wgMitra, watchUpdateMitra} from "./mitra";
import {watchCreateMobil, watchDeleteMobil, watchGet as wgMobil, watchUpdateMobil} from "./mobil";
import {watchCreateDriver, watchDeleteDriver, watchGet as wgDriver, watchUpdateDriver} from "./driver";
import {
    watchCreateDetailJadwal,
    watchDeleteDetailJadwal,
    watchGet as wgDetailJadwal,
    watchUpdateDetailJadwal
} from "./detailJadwal";
import {
    watchCreateTransaksi,
    watchDeleteTransaksi,
    watchGet as wgTransaksi,
    watchUpdateTransaksi,
    watchgetAvailableCar,
    watchgetAvailableDriver,
    watchGetCustomerTransaction
} from "./transaksi";
import {watchCreateCustomer, watchUpdateCustomer, watchGet as wgCustomer, watchVerifyCustomer} from "./customer";
import {watchGet as wgRole} from "./role";
import {watchGet as wgJadwal} from "./jadwal";
import {watchLogin, watchUserLogin} from "./auth";

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchUserLogin(),
        wgPegawai(),
        wgRole(),
        watchCreatePegawai(),
        watchDeletePegawai(),
        watchUpdatePegawai(),
        wgPromo(),
        watchCreatePromo(),
        watchDeletePromo(),
        watchUpdatePromo(),
        wgMitra(),
        watchCreateMitra(),
        watchDeleteMitra(),
        watchUpdateMitra(),
        wgCustomer(),
        watchVerifyCustomer(),
        watchCreateCustomer(),
        watchUpdateCustomer(),
        wgMobil(),
        watchCreateMobil(),
        watchDeleteMobil(),
        watchUpdateMobil(),
        wgDriver(),
        watchCreateDriver(),
        watchDeleteDriver(),
        watchUpdateDriver(),
        wgTransaksi(),
        watchCreateTransaksi(),
        watchDeleteTransaksi(),
        watchUpdateTransaksi(),
        watchgetAvailableCar(),
        watchgetAvailableDriver(),
        watchGetCustomerTransaction(),
        wgJadwal(),
        wgDetailJadwal(),
        watchCreateDetailJadwal(),
        watchUpdateDetailJadwal(),
        watchDeleteDetailJadwal()
    ])
}