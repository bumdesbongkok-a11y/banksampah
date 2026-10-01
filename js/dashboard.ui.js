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
   PERIODE AKTIF / SNAPSHOT TUTUP BUKU
===================================================== */

async function updateRankingSetoran(){

    const tbody =
    el("tblRankingSetoran");

    if(!tbody) return;

    tbody.innerHTML = "";


    /* =================================================
       AMBIL PERIODE DARI FILTER RANKING
    ================================================= */

    const cmbBulan =
    el("cmbBulanRanking");

    const txtTahun =
    el("txtTahunRanking");


    let bulan =
    cmbBulan
        ? Number(cmbBulan.value)
        : PERIODE.bulan;


    let tahun =
    txtTahun
        ? Number(txtTahun.value)
        : PERIODE.tahun;


    /* =================================================
       VALIDASI PERIODE
    ================================================= */

    if(
        !bulan ||
        !tahun
    ){

        bulan =
        PERIODE.bulan;

        tahun =
        PERIODE.tahun;

    }


    /* =================================================
       ISI FILTER JIKA MASIH KOSONG
    ================================================= */

    if(cmbBulan){

        cmbBulan.value =
        String(bulan);

    }


    if(txtTahun){

        txtTahun.value =
        tahun;

    }


    /* =================================================
       CEK APAKAH PERIODE SUDAH TUTUP BUKU
    ================================================= */

    let top3 = null;

    try{

        const snapshot =

        await db
        .collection(COL_TUTUP_BUKU)
        .where(
            "bulan",
            "==",
            bulan
        )
        .where(
            "tahun",
            "==",
            tahun
        )
        .limit(1)
        .get();


        if(!snapshot.empty){

            const data =
            snapshot.docs[0].data();


            if(
                Array.isArray(data.top3Setoran)
            ){

                top3 =
                data.top3Setoran;

            }

        }

    }
    catch(error){

        console.error(
            "Gagal memuat snapshot Top 3 :",
            error
        );

    }


    /* =================================================
       JIKA BELUM TUTUP BUKU
       HITUNG REALTIME DARI DATA SETORAN
    ================================================= */

    if(!top3){

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


        const ranking = {};


        setoranPeriode.forEach(item => {

            const idAnggota =
            item.idAnggota;

            if(!idAnggota)
                return;


            const anggota =
            DATA.anggota.find(a =>
                a.firestoreId === idAnggota
            );

            if(!anggota)
                return;


            if(
                anggota.ikutRanking === false
            ){
                return;
            }


            if(!ranking[idAnggota]){

                ranking[idAnggota] = {

                    idAnggota :
                    idAnggota,

                    nama :
                    anggota.nama,

                    rw :
                    String(anggota.rw).startsWith("RW ")
                        ? anggota.rw
                        : "RW " + anggota.rw,

                    total :
                    0

                };

            }


            ranking[idAnggota].total +=
            Number(item.total) || 0;

        });


        top3 =
        Object.values(ranking)
        .sort((a,b) =>
            b.total - a.total
        )
        .slice(0,3);

    }


    /* =================================================
       TIDAK ADA DATA
    ================================================= */

    if(
        !top3 ||
        top3.length === 0
    ){

        tbody.innerHTML = `

        <tr>

            <td
                colspan="4"
                align="center">

                Belum ada data ranking

            </td>

        </tr>

        `;

    }
    else{

        /* =============================================
           TAMPILKAN TOP 3
        ============================================= */

        top3.forEach((item,index) => {

            const rank =
            index + 1;


            let icon =
            rank;


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

    }


    /* =================================================
       TAMPILKAN PERIODE
    ================================================= */

    setText(

        "lblPeriodeRanking",

        "Periode : " +
        namaBulan(bulan) +
        " " +
        tahun

    );

}
function initFilterRankingSetoran(){

    const cmbBulan =
    el("cmbBulanRanking");

    const txtTahun =
    el("txtTahunRanking");


    if(!cmbBulan || !txtTahun)
        return;


    /* =============================================
       DEFAULT PERIODE
    ============================================= */

    cmbBulan.value =
    String(PERIODE.bulan);

    txtTahun.value =
    PERIODE.tahun;


    /* =============================================
       GANTI BULAN
    ============================================= */

    cmbBulan.addEventListener(
        "change",
        updateRankingSetoran
    );


    /* =============================================
       GANTI TAHUN
    ============================================= */

    txtTahun.addEventListener(
        "change",
        updateRankingSetoran
    );

}

