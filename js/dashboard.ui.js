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

}