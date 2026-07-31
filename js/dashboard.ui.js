/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard(){

    const totalAnggota =

    DATA.anggota.length;

    const totalSetoran =

    DATA.setoran.reduce(

        (t,item)=>

        t +

        Number(item.total||0),

        0

    );

    const totalPenjualan =

    DATA.penjualan.reduce(

        (t,item)=>

        t +

        Number(item.total||0),

        0

    );

    const totalOperasional =

    DATA.operasional.reduce(

        (t,item)=>

        t +

        Number(item.nominal||0),

        0

    );

    const totalPenarikan =

    DATA.penarikan.reduce(

        (t,item)=>

        t +

        Number(item.nominal||0),

        0

    );

    const saldoAnggota =

    totalSetoran -

    totalPenarikan;

    let laba =

    totalPenjualan -

    totalSetoran -

    totalOperasional;

    if(laba < 0){

        laba = 0;

    }

    const kas =

    laba / 2;

    const collecting =

    laba / 2;

    setText(

        "dashAnggota",

        totalAnggota

    );

    setText(

        "dashSetoran",

        formatRupiah(totalSetoran)

    );

    setText(

        "dashPenjualan",

        formatRupiah(totalPenjualan)

    );

    setText(

        "dashOperasional",

        formatRupiah(totalOperasional)

    );

    setText(

        "dashLaba",

        formatRupiah(laba)

    );

    setText(

        "dashSaldo",

        formatRupiah(saldoAnggota)

    );

    setText(

        "dashKas",

        formatRupiah(kas)

    );

    setText(

        "dashBUMDes",

        formatRupiah(kas)

    );

    setText(

        "dashCollecting",

        formatRupiah(collecting)

    );

}