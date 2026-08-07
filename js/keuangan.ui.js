/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : keuangan.ui.js
===================================================== */

/* =====================================================
   TAMPILKAN RINGKASAN KEUANGAN
===================================================== */

function tampilRingkasanKeuangan(){

    const data =

    hitungKeuangan();

setText(

    "lblPeriodeKeuangan",

    namaBulan(
        data.bulan
    ) +

    " " +

    data.tahun

);


    setText(

        "lblTotalSetoran",

        formatRupiah(

            data.totalSetoran

        )

    );



    setText(

        "lblTotalPenjualan",

        formatRupiah(

            data.totalPenjualan

        )

    );



    setText(

        "lblTotalOperasional",

        formatRupiah(

            data.totalOperasional

        )

    );



    setText(

        "lblLabaBersih",

        formatRupiah(

            data.laba

        )

    );



    setText(

        "lblHakBUMDES",

        formatRupiah(

            data.hakBUMDES

        )

    );



    setText(

        "lblHakCollecting",

        formatRupiah(

            data.hakCollecting

        )

    );

}

/* =====================================================
   HITUNG SALDO ANGGOTA
===================================================== */

function hitungSaldoAnggota(){

    const totalSetoran =

    DATA.setoran.reduce(

        (total,item)=>

        total +

        Number(item.total || 0),

        0

    );

    const totalPenarikan =

    DATA.penarikan.reduce(

        (total,item)=>

        total +

        Number(item.nominal || 0),

        0

    );

    return(

        totalSetoran -

        totalPenarikan

    );

}

/* =====================================================
   HITUNG KEUANGAN
===================================================== */

function hitungKeuangan(){

    const setoran =
    getSetoranPeriode();

    const penjualan =
    getPenjualanPeriode();

    const penarikan =
    getPenarikanPeriode();

    const operasional =
    getOperasionalPeriode();



    const totalSetoran =
    setoran.reduce(

        (t,item)=>

        t +

        Number(item.total || 0),

        0

    );



    const totalPenjualan =
    penjualan.reduce(

        (t,item)=>

        t +

        Number(item.total || 0),

        0

    );



    const totalPenarikan =
    penarikan.reduce(

        (t,item)=>

        t +

        Number(item.nominal || 0),

        0

    );



    const totalOperasional =
    operasional.reduce(

        (t,item)=>

        t +

        Number(item.nominal || 0),

        0

    );



    let laba =

        totalPenjualan -

        totalSetoran -

        totalOperasional;



    if(

        laba < 0

    ){

        laba = 0;

    }



    return{

        bulan :

        PERIODE.bulan,



        tahun :

        PERIODE.tahun,



        totalSetoran,



        totalPenjualan,



        totalPenarikan,



        totalOperasional,



        laba,



        hakBUMDES :

        laba / 2,



        hakCollecting :

        laba / 2,



        totalTransaksi :

        setoran.length,



        totalAnggota :

        DATA.anggota.length

    };

}

/* =====================================================
   TAMPIL LABA RUGI
===================================================== */

function tampilLabaRugi(){

    const data =

    hitungKeuangan();



    setText(

        "lblPeriodeLabaRugi",

        namaBulan(
            data.bulan
        )
        +
        " "
        +
        data.tahun

    );



    setText(

        "lrPenjualan",

        formatRupiah(
            data.totalPenjualan
        )

    );



    setText(

        "lrPendapatan",

        formatRupiah(
            data.totalPenjualan
        )

    );



    setText(

        "lrSetoran",

        formatRupiah(
            data.totalSetoran
        )

    );



    setText(

        "lrOperasional",

        formatRupiah(
            data.totalOperasional
        )

    );



    const totalBeban =

        data.totalSetoran +

        data.totalOperasional;



    setText(

        "lrBeban",

        formatRupiah(
            totalBeban
        )

    );



    setText(

        "lrLaba",

        formatRupiah(
            data.laba
        )

    );

}

/* =====================================================
   TAMPIL PEMBAGIAN LABA
===================================================== */

function tampilPembagianLaba(){

    const data =

    hitungKeuangan();



    setText(

        "lblPeriodePembagian",

        namaBulan(
            data.bulan
        )
        +
        " "
        +
        data.tahun

    );



    setText(

        "pbLaba",

        formatRupiah(
            data.laba
        )

    );



    setText(

        "pbBUMDES",

        formatRupiah(
            data.hakBUMDES
        )

    );



    setText(

        "pbCollecting",

        formatRupiah(
            data.hakCollecting
        )

    );

}
/* =====================================================
   TAMPIL TUTUP BUKU
===================================================== */

function tampilTutupBuku(){

    const bulan =

    Number(

        getValue(

            "cmbBulanTutup"

        )

    );

    const tahun =

    Number(

        getValue(

            "txtTahunTutup"

        )

    );

    const data =

    hitungKeuanganPeriode(

        bulan,

        tahun

    );

    setText(

        "tbPeriode",

        namaBulan(data.bulan)
        +
        " "
        +
        data.tahun

    );

    setText(

        "tbLaba",

        formatRupiah(
            data.laba
        )

    );

    setText(

        "tbBUMDES",

        formatRupiah(
            data.hakBUMDES
        )

    );

    setText(

        "tbCollecting",

        formatRupiah(
            data.hakCollecting
        )

    );

    /* ==========================================
       TAMBAHAN BARU
    ========================================== */

    setText(

    "tbSaldoAnggota",

    formatRupiah(

        hitungSaldoAnggotaPeriode(

            bulan,

            tahun

        )

    )

);

setText(

    "tbSaldoKas",

    formatRupiah(

        hitungSaldoKasPeriode(

            bulan,

            tahun

        )

    )

);

}
/* =====================================================
   TAMPIL TABEL TUTUP BUKU
===================================================== */

function tampilTutupBukuTable(){

    const tbody =

    document.querySelector(
        "#tblTutupBuku tbody"
    );


    if(!tbody) return;



    tbody.innerHTML = "";



    DATA.tutupBuku.forEach(item=>{


        const tr =

        document.createElement(
            "tr"
        );



        tr.innerHTML = `

            <td>

                ${

                namaBulan(
                    item.bulan
                )

                }

                ${item.tahun}

            </td>


            <td>

                ${

                formatRupiah(
                    item.laba
                )

                }

            </td>


            <td>

                ✅ Ditutup

            </td>

        `;



        tbody.appendChild(tr);


    });


}

/* =====================================================
   TAMPIL ARSIP KEUANGAN
===================================================== */

function tampilArsipKeuangan(data = DATA.tutupBuku){	

    const tbody =

    document.querySelector(
        "#tblArsipKeuangan tbody"
    );


    if(!tbody) return;


    tbody.innerHTML = "";



    data.forEach(item=>{


        tbody.innerHTML += `

        <tr>


            <td>

                ${
                    namaBulan(
                        item.bulan
                    )
                }

                ${item.tahun}

            </td>



            <td>

                ${
                    formatRupiah(
                        item.laba
                    )
                }

            </td>



            <td>

                ✅ Ditutup

            </td>



            <td>

                <button

                class="btn"

                onclick="lihatDetailTutupBuku('${item.firestoreId}')">

                    👁 Lihat

                </button>

            </td>


        </tr>

        `;


    });


}

/* =====================================================
   ISI FILTER TAHUN KEUANGAN
===================================================== */

function isiFilterTahunKeuangan(){

    const select =

    el(
        "filterTahunKeuangan"
    );


    if(!select) return;


    select.innerHTML = `

        <option value="">
            Semua Tahun
        </option>

    `;


    const tahun =

    [...new Set(

        DATA.tutupBuku.map(
            item=>item.tahun
        )

    )];



    tahun.forEach(t=>{


        select.innerHTML += `

        <option value="${t}">
            ${t}
        </option>

        `;


    });


}

/* =====================================================
   FILTER ARSIP KEUANGAN
===================================================== */

function filterArsipKeuangan(){

    const tahun =
    el("filterTahunKeuangan").value;


    const bulan =
    el("filterBulanKeuangan").value;



    const data =
    DATA.tutupBuku.filter(item=>{


        let cocok = true;


        if(tahun){

            cocok =
            cocok &&
            item.tahun ==
            tahun;

        }


        if(bulan){

            cocok =
            cocok &&
            item.bulan ==
            bulan;

        }


        return cocok;


    });



    tampilArsipKeuangan(data);

}

/* =====================================================
   DETAIL TUTUP BUKU
===================================================== */

function lihatDetailTutupBuku(id){


const data =

DATA.tutupBuku.find(

    item =>

    item.firestoreId === id

);



    if(!data){

        return;

    }


    setText(

        "dtPeriode",

        namaBulan(
            data.bulan
        )
        +
        " "
        +
        data.tahun

    );



    setText(

        "dtPenjualan",

        formatRupiah(
            data.totalPenjualan
        )

    );



    setText(

        "dtSetoran",

        formatRupiah(
            data.totalSetoran
        )

    );



    setText(

        "dtOperasional",

        formatRupiah(
            data.totalOperasional
        )

    );



    setText(

        "dtLaba",

        formatRupiah(
            data.laba
        )

    );



    setText(

        "dtBUMDES",

        formatRupiah(
            data.hakBUMDES
        )

    );



    setText(

        "dtCollecting",

        formatRupiah(
            data.hakCollecting
        )

    );



    bukaHalaman(
        "halDetailKeuangan"
    );


}

/* =====================================================
   FILTER PERIODE CUSTOM
===================================================== */

function filterPeriodeCustom(

    data,

    bulan,

    tahun

){

    return data.filter(item=>{

        if(!item.tanggal)

            return false;

        const tgl =

        new Date(item.tanggal);

        return(

            tgl.getMonth()+1 == bulan &&

            tgl.getFullYear() == tahun

        );

    });

}

/* =====================================================
   HITUNG KEUANGAN PERIODE
===================================================== */

function hitungKeuanganPeriode(

    bulan,

    tahun

){

    const setoran =

    filterPeriodeCustom(

        DATA.setoran,

        bulan,

        tahun

    );



    const penjualan =

    filterPeriodeCustom(

        DATA.penjualan,

        bulan,

        tahun

    );



    const penarikan =

    filterPeriodeCustom(

        DATA.penarikan,

        bulan,

        tahun

    );



    const operasional =

    filterPeriodeCustom(

        DATA.operasional,

        bulan,

        tahun

    );



    const totalSetoran =

    setoran.reduce(

        (t,item)=>

        t + Number(item.total||0),

        0

    );



    const totalPenjualan =

    penjualan.reduce(

        (t,item)=>

        t + Number(item.total||0),

        0

    );



    const totalPenarikan =

    penarikan.reduce(

        (t,item)=>

        t + Number(item.nominal||0),

        0

    );



    const totalOperasional =

    operasional.reduce(

        (t,item)=>

        t + Number(item.nominal||0),

        0

    );



    let laba =

        totalPenjualan -

        totalSetoran -

        totalOperasional;



    if(laba < 0){

        laba = 0;

    }



    return{

        bulan,

        tahun,

        totalSetoran,

        totalPenjualan,

        totalPenarikan,

        totalOperasional,

        laba,

        hakBUMDES :

        laba / 2,

        hakCollecting :

        laba / 2

    };

}

/* =====================================================
   HITUNG KEUANGAN BULAN AKTIF
===================================================== */

function hitungKeuangan(){

    return hitungKeuanganPeriode(

        PERIODE.bulan,

        PERIODE.tahun

    );

}

/* =====================================================
   AMBIL SALDO AWAL
===================================================== */

function getSaldoAwal(){

    if(!DATA.tutupBuku){

        return{

            saldoAnggota : 0,

            saldoKas : 0

        };

    }

    return{

        saldoAnggota :

        Number(

            DATA.tutupBuku.saldoAnggota ||

            0

        ),

        saldoKas :

        Number(

            DATA.tutupBuku.saldoKas ||

            0

        )

    };

}

/* =====================================================
   HITUNG SALDO ANGGOTA PERIODE
===================================================== */

function hitungSaldoAnggotaPeriode(bulan,tahun){

    let saldo = 0;

    DATA.setoran.forEach(item=>{

        const tgl = new Date(item.tanggal);

        const b = tgl.getMonth() + 1;

        const th = tgl.getFullYear();

        if(

            th < tahun ||

            (

                th == tahun &&

                b <= bulan

            )

        ){

            saldo += Number(

                item.total || 0

            );

        }

    });

    DATA.penarikan.forEach(item=>{

        const tgl = new Date(item.tanggal);

        const b = tgl.getMonth() + 1;

        const th = tgl.getFullYear();

        if(

            th < tahun ||

            (

                th == tahun &&

                b <= bulan

            )

        ){

            saldo -= Number(

                item.nominal || 0

            );

        }

    });

    return saldo;

}

/* =====================================================
   HITUNG SALDO KAS PERIODE
===================================================== */

function hitungSaldoKasPeriode(bulan,tahun){

    let saldo = 0;

    DATA.kas.forEach(item=>{

        const tgl = new Date(item.tanggal);

        const b = tgl.getMonth() + 1;

        const th = tgl.getFullYear();

        if(

            th < tahun ||

            (

                th == tahun &&

                b <= bulan

            )

        ){

            if(item.jenis == "Masuk"){

                saldo += Number(

                    item.nominal || 0

                );

            }else{

                saldo -= Number(

                    item.nominal || 0

                );

            }

        }

    });

    return saldo;

}




