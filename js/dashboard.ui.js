/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard(){

    const data =

    hitungKeuangan();

setText(

    "lblPeriodeDashboard",

    "Periode : " +

    namaBulan(
        data.bulan
    ) +

    " " +

    data.tahun

);

    const totalAnggota =

    DATA.anggota.length;



    const saldoAnggota =

hitungSaldoAnggota();



    setText(

        "dashAnggota",

        totalAnggota

    );



    setText(

        "dashSetoran",

        formatRupiah(

            data.totalSetoran

        )

    );



    setText(

        "dashPenjualan",

        formatRupiah(

            data.totalPenjualan

        )

    );



    setText(

        "dashOperasional",

        formatRupiah(

            data.totalOperasional

        )

    );



    setText(

        "dashLaba",

        formatRupiah(

            data.laba

        )

    );



    setText(

        "dashSaldo",

        formatRupiah(

            saldoAnggota

        )

    );



    setText(

    "dashKas",

    formatRupiah(

        hitungSaldoKas()

    )

);



    setText(

        "dashBUMDes",

        formatRupiah(

            data.hakBUMDES

        )

    );



    setText(

        "dashCollecting",

        formatRupiah(

            data.hakCollecting

        )

    );

	 updateRankingSetoran();

}


/* =====================================================
   RANKING SETORAN BULANAN - TOP 3
===================================================== */

function updateRankingSetoran(){

    const tbody =
    el("tblRankingSetoran");


    if(!tbody) return;


    tbody.innerHTML = "";


    /* =================================================
       AMBIL PERIODE AKTIF
    ================================================= */

    const bulan =
    PERIODE.bulan;

    const tahun =
    PERIODE.tahun;


    /* =================================================
       FILTER SETORAN PERIODE AKTIF
    ================================================= */

    const setoranPeriode =
    DATA.setoran.filter(item => {

        if(!item.tanggal)
        return false;


        const tanggal =
        new Date(item.tanggal);


        return (
            tanggal.getMonth() + 1 === bulan &&
            tanggal.getFullYear() === tahun
        );

    });


    /* =================================================
       KELOMPOKKAN BERDASARKAN ANGGOTA
    ================================================= */

    const ranking = {};


    setoranPeriode.forEach(item => {

        const idAnggota =
        item.idAnggota;


        if(!idAnggota)
        return;


        /* ---------------------------------------------
           CARI DATA ANGGOTA
        --------------------------------------------- */

        const anggota =
        DATA.anggota.find(a =>
            a.firestoreId === idAnggota
        );


        if(!anggota)
        return;


        /* ---------------------------------------------
           CEK IKUT RANKING
           
           Anggota lama yang belum memiliki
           ikutRanking dianggap ikut.
        --------------------------------------------- */

        if(
            anggota.ikutRanking === false
        ){
            return;
        }


        if(!ranking[idAnggota]){

            ranking[idAnggota] = {

                nama:
                anggota.nama,

                rw:
String(anggota.rw).startsWith("RW ")
    ? anggota.rw
    : "RW " + anggota.rw,

                total:
                0

            };

        }


        ranking[idAnggota].total +=
        Number(item.total) || 0;

    });


    /* =================================================
       URUTKAN TERBESAR
    ================================================= */

    const hasil =
    Object.values(ranking)
    .sort((a,b) =>
        b.total - a.total
    )
    .slice(0,3);


    /* =================================================
       TIDAK ADA DATA
    ================================================= */

    if(hasil.length === 0){

        tbody.innerHTML = `

        <tr>

            <td
                colspan="4"
                align="center">

                Belum ada data ranking

            </td>

        </tr>

        `;

        return;

    }


    /* =================================================
       TAMPILKAN TOP 3
    ================================================= */

    hasil.forEach((item,index) => {

        let rank = index + 1;


        let icon = rank;


        if(rank === 1)
            icon = "🥇";

        if(rank === 2)
            icon = "🥈";

        if(rank === 3)
            icon = "🥉";


        tbody.innerHTML += `

        <tr>

            <td align="center">

                ${icon}

            </td>


            <td>

                ${item.nama}

            </td>


            <td>

                ${item.rw}

            </td>


            <td align="right">

                ${formatRupiah(item.total)}

            </td>

        </tr>

        `;

    });


    /* =================================================
       PERIODE RANKING
    ================================================= */

    setText(

        "lblPeriodeRanking",

        "Periode : " +
        namaBulan(bulan) +
        " " +
        tahun

    );

}

