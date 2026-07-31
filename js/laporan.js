/* =====================================================
   INIT
===================================================== */

function initLaporan(){

    console.log(

        "initLaporan berjalan"

    );

    resetFilterLaporan();

    isiDropdownRW(

        "lapRW"

    );

    isiDropdownLaporanAnggota();

    tampilLaporan();

    eventLaporan();

}

/* =====================================================
   EVENT
===================================================== */

function eventLaporan(){

    el("btnTampilLaporan")
    .addEventListener(

        "click",

        tampilLaporan

    );



    el("btnResetLaporan")
    .addEventListener(

        "click",

        ()=>{

            resetFilterLaporan();

            tampilLaporan();

        }

    );



    el("lapRW")
    .addEventListener(

        "change",

        isiDropdownLaporanAnggota

    );



    el("btnExcelLaporan")
    .addEventListener(

        "click",

        exportExcelLaporan

    );



    el("btnSalinLaporan")
.addEventListener(
    "click",
    salinLaporan
);

el("lapRW")
.addEventListener(
    "change",
    ()=>{

        isiDropdownLaporanAnggota();

        tampilLaporan();

    }
);

el("lapAnggota")
.addEventListener(
    "change",
    tampilLaporan
);

}

/* =====================================================
   EXPORT EXCEL
===================================================== */

function exportExcelLaporan(){

    const jenis =

    getValue("cmbJenisLaporan");

    switch(jenis){

        case "setoran":

            exportExcelSetoran();

            break;
			
			case "penjualan":

    exportExcelPenjualan();

    break;
	
	case "penarikan":

    exportExcelPenarikan();

    break;
	
	case "rekaprw":

    exportExcelRekapRW();

    break;
	
	case "saldo":

    exportExcelSaldo();

    break;

        default:

            alert(

                "Jenis laporan belum didukung."

            );

    }

}

/* =====================================================
   EXPORT EXCEL SETORAN
===================================================== */

function exportExcelSetoran(){

    const data =

    filterLaporan(

        DATA.setoran

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const excel = [];

    data.forEach(item=>{

        const anggota =

        getAnggota(

            item.idAnggota

        );

        excel.push({

            "Tanggal" : item.tanggal,

            "RW" : anggota ? anggota.rw : "-",

            "ID Anggota" :

            anggota ?

            anggota.idAnggota :

            "-",

            "Nama" :

            anggota ?

            anggota.nama :

            "-",

            "Jenis Barang" :

            item.jenisBarang,

            "Berat" :

            item.berat,

            "Harga" :

            item.harga,

            "Total" :

            item.total

        });

    });

    exportExcel(
    excel,
    "Setoran",
    "Laporan_Setoran"
);

}

/* =====================================================
   EXPORT EXCEL PENJUALAN
===================================================== */

function exportExcelPenjualan(){

    const data =

    filterLaporan(

        DATA.penjualan

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const excel = [];

    data.forEach(item=>{

        excel.push({

            "Tanggal" : item.tanggal,

            "Jenis Barang" :

            item.jenisBarang,

            "Berat (Kg)" :

            item.berat,

            "Harga" :

            item.harga,

            "Total" :

            item.total

        });

    });

    exportExcel(

        excel,

        "Penjualan",

        "Laporan_Penjualan"

    );

}

/* =====================================================
   EXPORT EXCEL PENARIKAN
===================================================== */

function exportExcelPenarikan(){

    const data =

    filterLaporan(

        DATA.penarikan

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const excel = [];

    data.forEach(item=>{

        const anggota =

        getAnggota(

            item.idAnggota

        );

        excel.push({

            "Tanggal" : item.tanggal,

            "RW" :

            anggota ?

            anggota.rw :

            "-",

            "ID Anggota" :

            anggota ?

            anggota.idAnggota :

            "-",

            "Nama" :

            anggota ?

            anggota.nama :

            "-",

            "Nominal" :

            item.nominal,

            "Keterangan" :

            item.keterangan || ""

        });

    });

    exportExcel(

        excel,

        "Penarikan",

        "Laporan_Penarikan"

    );

}

/* =====================================================
   EXPORT EXCEL REKAP RW
===================================================== */

function exportExcelRekapRW(){

    const excel = [];

    ["1","2","3","4","5"].forEach(rw=>{

        const anggotaRW =

        DATA.anggota.filter(

            item=>item.rw===rw

        );

        const idAnggota =

        anggotaRW.map(

            item=>item.firestoreId

        );

        const totalSetoran =

        DATA.setoran

        .filter(item=>

            idAnggota.includes(

                item.idAnggota

            )

        )

        .reduce(

            (t,item)=>

            t +

            Number(item.total||0),

            0

        );

        const totalPenarikan =

        DATA.penarikan

        .filter(item=>

            idAnggota.includes(

                item.idAnggota

            )

        )

        .reduce(

            (t,item)=>

            t +

            Number(item.nominal||0),

            0

        );

        excel.push({

            "RW" :

            "RW " + rw,

            "Jumlah Anggota" :

            anggotaRW.length,

            "Total Setoran" :

            totalSetoran,

            "Total Penarikan" :

            totalPenarikan,

            "Saldo" :

            totalSetoran -

            totalPenarikan

        });

    });

    exportExcel(

        excel,

        "Rekap RW",

        "Laporan_Rekap_RW"

    );

}

/* =====================================================
   EXPORT EXCEL SALDO ANGGOTA
===================================================== */

function exportExcelSaldo(){

    const excel = [];

    DATA.anggota.forEach(item=>{

        const totalSetoran =

        DATA.setoran

        .filter(s=>

            s.idAnggota===

            item.firestoreId

        )

        .reduce(

            (t,s)=>

            t +

            Number(s.total||0),

            0

        );

        const totalPenarikan =

        DATA.penarikan

        .filter(p=>

            p.idAnggota===

            item.firestoreId

        )

        .reduce(

            (t,p)=>

            t +

            Number(p.nominal||0),

            0

        );

        excel.push({

            "RW" :

            item.rw,

            "ID Anggota" :

            item.idAnggota,

            "Nama" :

            item.nama,

            "Total Setoran" :

            totalSetoran,

            "Total Penarikan" :

            totalPenarikan,

            "Saldo" :

            totalSetoran -

            totalPenarikan

        });

    });

    exportExcel(

        excel,

        "Saldo Anggota",

        "Laporan_Saldo_Anggota"

    );

}

/* =====================================================
   EXPORT EXCEL UMUM
===================================================== */

function exportExcel(

    data,

    judul,

    namaFile

){

    const workbook =

    XLSX.utils.book_new();

    const worksheet =

    XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        judul

    );

    XLSX.writeFile(

        workbook,

        namaFile + ".xlsx"

    );

}



/* =====================================================
   SALIN LAPORAN
===================================================== */

function salinLaporan(){

    const jenis =

    getValue("cmbJenisLaporan");

    switch(jenis){

        case "setoran":

            salinLaporanSetoran();

            break;
			
			case "penjualan":

    salinLaporanPenjualan();

    break;
	
	case "penjualan":

    salinLaporanPenjualan();

    break;
	
	case "rekaprw":

    salinLaporanRekapRW();

    break;

case "saldo":

    salinLaporanSaldo();

    break;

        default:

            alert(

                "Jenis laporan belum didukung."

            );

    }

}

/* =====================================================
   SALIN LAPORAN SETORAN
===================================================== */

function salinLaporanSetoran(){

    const data =

    filterLaporan(

        DATA.setoran

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const tglAwal =
getValue("lapTanggalAwal") || "-";

const tglAkhir =
getValue("lapTanggalAkhir") || "-";

const rw =
getValue("lapRW") || "Semua";

const teksRW =

rw === "Semua"

? rw

: "RW " + rw;

let teks =

`*BANK SAMPAH SUMBER REJEKI*

*LAPORAN SETORAN*

Periode : ${tglAwal} s/d ${tglAkhir}
RW       : ${teksRW}

--------------------------------

`;

    data.forEach((item,index)=>{

        const anggota =

        getAnggota(

            item.idAnggota

        );

        teks +=

`${index+1}. ${item.tanggal}

Nama   : ${anggota ? anggota.nama : "-"}

Barang : ${item.jenisBarang}

Berat  : ${item.berat} Kg

Total  : ${formatRupiah(item.total)}

`;

`${item.tanggal}
RW : ${anggota ? anggota.rw : "-"}
Nama : ${anggota ? anggota.nama : "-"}
Barang : ${item.jenisBarang}
Berat : ${item.berat}
Total : ${formatRupiah(item.total)}

`;

    });
	
	const totalBerat =

data.reduce(

    (t,item)=>

    t +

    Number(item.berat||0),

    0

);

const totalNilai =

data.reduce(

    (t,item)=>

    t +

    Number(item.total||0),

    0

);

teks +=

`--------------------------------

Total Transaksi : ${data.length}

Total Berat     : ${totalBerat} Kg

Total Nilai     : ${formatRupiah(totalNilai)}

`;

    navigator.clipboard

.writeText(teks)

.then(()=>{

    alert(

        "Laporan berhasil disalin."

    );

})
.catch(()=>{

    alert(

        "Gagal menyalin laporan."

    );

});

}

/* =====================================================
   SALIN LAPORAN PENJUALAN
===================================================== */

function salinLaporanPenjualan(){

    const data =

    filterLaporan(

        DATA.penjualan

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const tglAwal =

    getValue(

        "lapTanggalAwal"

    ) || "-";

    const tglAkhir =

    getValue(

        "lapTanggalAkhir"

    ) || "-";

    let teks =

`*BANK SAMPAH SUMBER REJEKI*

*LAPORAN PENJUALAN*

Periode : ${tglAwal} s/d ${tglAkhir}

--------------------------------

`;

    data.forEach((item,index)=>{

        teks +=

`${index+1}. ${item.tanggal}

Barang : ${item.jenisBarang}

Berat  : ${item.berat} Kg

Harga  : ${formatRupiah(item.harga)}

Total  : ${formatRupiah(item.total)}

`;

    });

    const totalBerat =

    data.reduce(

        (t,item)=>

        t +

        Number(item.berat||0),

        0

    );

    const totalNilai =

    data.reduce(

        (t,item)=>

        t +

        Number(item.total||0),

        0

    );

    teks +=

`--------------------------------

Total Transaksi : ${data.length}

Total Berat     : ${totalBerat} Kg

Total Penjualan : ${formatRupiah(totalNilai)}
`;

    navigator.clipboard

    .writeText(teks)

    .then(()=>{

        alert(

            "Laporan berhasil disalin."

        );

    })

    .catch(()=>{

        alert(

            "Gagal menyalin laporan."

        );

    });

}

/* =====================================================
   SALIN LAPORAN PENARIKAN
===================================================== */

function salinLaporanPenarikan(){

    const data =

    filterLaporan(

        DATA.penarikan

    );

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    const tglAwal =

    getValue("lapTanggalAwal") || "-";

    const tglAkhir =

    getValue("lapTanggalAkhir") || "-";

    let teks =

`*BANK SAMPAH SUMBER REJEKI*

*LAPORAN PENARIKAN*

Periode : ${tglAwal} s/d ${tglAkhir}

--------------------------------

`;

    data.forEach((item,index)=>{

        const anggota =

        getAnggota(

            item.idAnggota

        );

        teks +=

`${index+1}. ${item.tanggal}

Nama       : ${anggota ? anggota.nama : "-"}

RW         : ${anggota ? anggota.rw : "-"}

Nominal    : ${formatRupiah(item.nominal)}

Keterangan : ${item.keterangan || "-"}

`;

    });

    const totalNominal =

    data.reduce(

        (t,item)=>

        t +

        Number(item.nominal||0),

        0

    );

    teks +=

`--------------------------------

Total Transaksi : ${data.length}

Total Penarikan : ${formatRupiah(totalNominal)}

`;

    navigator.clipboard

    .writeText(teks)

    .then(()=>{

        alert(

            "Laporan berhasil disalin."

        );

    })

    .catch(()=>{

        alert(

            "Gagal menyalin laporan."

        );

    });

}

/* =====================================================
   SALIN LAPORAN REKAP RW
===================================================== */

function salinLaporanRekapRW(){

    const daftarRW = [

        "1",

        "2",

        "3",

        "4",

        "5"

    ];

    let teks =

`*BANK SAMPAH SUMBER REJEKI*

*LAPORAN REKAP RW*

--------------------------------

`;

    let grandAnggota = 0;

    let grandSetoran = 0;

    let grandPenarikan = 0;

    let grandSaldo = 0;

    daftarRW.forEach(rw=>{

        const anggotaRW =

        DATA.anggota.filter(

            item=>item.rw===rw

        );

        const jumlahAnggota =

        anggotaRW.length;

        const idAnggota =

        anggotaRW.map(

            item=>item.firestoreId

        );

        const totalSetoran =

        DATA.setoran

        .filter(item=>

            idAnggota.includes(

                item.idAnggota

            )

        )

        .reduce(

            (t,item)=>

            t+

            Number(item.total||0),

            0

        );

        const totalPenarikan =

        DATA.penarikan

        .filter(item=>

            idAnggota.includes(

                item.idAnggota

            )

        )

        .reduce(

            (t,item)=>

            t+

            Number(item.nominal||0),

            0

        );

        const saldo =

        totalSetoran -

        totalPenarikan;

        grandAnggota += jumlahAnggota;

        grandSetoran += totalSetoran;

        grandPenarikan += totalPenarikan;

        grandSaldo += saldo;

        teks +=

`RW ${rw}

Anggota   : ${jumlahAnggota}

Setoran   : ${formatRupiah(totalSetoran)}

Penarikan : ${formatRupiah(totalPenarikan)}

Saldo     : ${formatRupiah(saldo)}

`;

    });

    teks +=

`--------------------------------

TOTAL

Anggota   : ${grandAnggota}

Setoran   : ${formatRupiah(grandSetoran)}

Penarikan : ${formatRupiah(grandPenarikan)}

Saldo     : ${formatRupiah(grandSaldo)}
`;

    navigator.clipboard.writeText(teks);

    alert(

        "Laporan berhasil disalin."

    );

}

/* =====================================================
   SALIN LAPORAN SALDO ANGGOTA
===================================================== */

function salinLaporanSaldo(){

    const data =

    DATA.anggota;

    if(data.length===0){

        alert(

            "Tidak ada data."

        );

        return;

    }

    let teks =

`*BANK SAMPAH SUMBER REJEKI*

*LAPORAN SALDO ANGGOTA*

--------------------------------

`;

    let grandSaldo = 0;

    data.forEach((item,index)=>{

        const totalSetoran =

        DATA.setoran

        .filter(

            s=>

            s.idAnggota===

            item.firestoreId

        )

        .reduce(

            (t,s)=>

            t+

            Number(s.total||0),

            0

        );

        const totalPenarikan =

        DATA.penarikan

        .filter(

            p=>

            p.idAnggota===

            item.firestoreId

        )

        .reduce(

            (t,p)=>

            t+

            Number(p.nominal||0),

            0

        );

        const saldo =

        totalSetoran -

        totalPenarikan;

        grandSaldo += saldo;

        teks +=

`${index+1}. ${item.nama}

ID     : ${item.idAnggota}

RW     : ${item.rw}

Saldo  : ${formatRupiah(saldo)}

`;

    });

    teks +=

`--------------------------------

Jumlah Anggota : ${data.length}

Total Saldo    : ${formatRupiah(grandSaldo)}
`;

    navigator.clipboard.writeText(teks);

    alert(

        "Laporan berhasil disalin."

    );

}

