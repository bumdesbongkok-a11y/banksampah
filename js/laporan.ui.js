/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : laporan.ui.js

   BAGIAN 1
   - FILTER LAPORAN
   - HEADER SETORAN
   - TAMPIL SETORAN
===================================================== */


/* =====================================================
   FILTER DATA TRANSAKSI
===================================================== */

function filterLaporan(data){


    const tglAwal =
    getValue(
        "lapTanggalAwal"
    );


    const tglAkhir =
    getValue(
        "lapTanggalAkhir"
    );


    const rw =
    getValue(
        "lapRW"
    );


    const anggotaFilter =
    getValue(
        "lapAnggota"
    );



    return data.filter(item=>{


        // ============================
        // FILTER TANGGAL
        // ============================

        if(
            tglAwal &&
            item.tanggal < tglAwal
        ){

            return false;

        }


        if(
            tglAkhir &&
            item.tanggal > tglAkhir
        ){

            return false;

        }



        // ============================
        // FILTER RW
        // ============================

        if(rw){


            const anggota =

            getAnggota(
                item.idAnggota
            );


            if(!anggota){

                return false;

            }



            const rwData =

            String(
                anggota.rw
            )
            .replace(
                "RW ",
                ""
            )
            .trim();



            const rwFilter =

            String(
                rw
            )
            .replace(
                "RW ",
                ""
            )
            .trim();



            if(
                rwData !== rwFilter
            ){

                return false;

            }


        }



        // ============================
        // FILTER ANGGOTA
        // ============================

        if(
            anggotaFilter &&
            item.idAnggota !== anggotaFilter
        ){

            return false;

        }



        return true;


    });


}





/* =====================================================
   HEADER SETORAN
===================================================== */

function headerLaporanSetoran(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN SETORAN
===================================================== */

function tampilLaporanSetoran(){


    headerLaporanSetoran();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.setoran
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="8">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const anggota =

        getAnggota(
            item.idAnggota
        );



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.rw
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.idAnggota
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.nama
                    :
                    "-"
                }
            </td>


            <td>
                ${item.jenisBarang || ""}
            </td>


            <td>
                ${item.berat || 0}
            </td>


            <td>
                ${formatRupiah(item.harga)}
            </td>


            <td>
                ${formatRupiah(item.total)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
   HEADER PENJUALAN
===================================================== */

function headerLaporanPenjualan(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN PENJUALAN
===================================================== */

function tampilLaporanPenjualan(){


    headerLaporanPenjualan();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.penjualan
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="5">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
                ${item.jenisBarang || ""}
            </td>


            <td>
                ${item.berat || 0}
            </td>


            <td>
                ${formatRupiah(item.harga)}
            </td>


            <td>
                ${formatRupiah(item.total)}
            </td>


        </tr>
        `;


    });


}






/* =====================================================
   HEADER PENARIKAN
===================================================== */

function headerLaporanPenarikan(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Nominal</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN PENARIKAN
===================================================== */

function tampilLaporanPenarikan(){


    headerLaporanPenarikan();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.penarikan
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="5">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const anggota =

        getAnggota(
            item.idAnggota
        );



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.rw
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.idAnggota
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.nama
                    :
                    "-"
                }
            </td>


            <td>
                ${formatRupiah(item.nominal)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
   HEADER SALDO ANGGOTA
===================================================== */

function headerLaporanSaldo(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Saldo</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN SALDO ANGGOTA
   HISTORI SEMUA WAKTU
===================================================== */

function tampilLaporanSaldo(){


    headerLaporanSaldo();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    let data =

    DATA.anggota;



    const rw =

    getValue(
        "lapRW"
    );



    const anggotaFilter =

    getValue(
        "lapAnggota"
    );



    if(rw){


        data =

        data.filter(item=>{


            return String(item.rw)
            .replace(
                "RW ",
                ""
            )
            .trim()

            ===

            String(rw)
            .replace(
                "RW ",
                ""
            )
            .trim();


        });


    }




    if(anggotaFilter){


        data =

        data.filter(item=>

            item.firestoreId ===
            anggotaFilter

        );


    }





    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="6">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const totalSetoran =

        hitungTotalSetoranAnggota(
            item.firestoreId
        );



        const totalPenarikan =

        hitungTotalPenarikanAnggota(
            item.firestoreId
        );



        const saldo =

        totalSetoran -
        totalPenarikan;



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.rw}
            </td>


            <td>
                ${item.idAnggota}
            </td>


            <td>
                ${item.nama}
            </td>


            <td>
                ${formatRupiah(totalSetoran)}
            </td>


            <td>
                ${formatRupiah(totalPenarikan)}
            </td>


            <td>
                ${formatRupiah(saldo)}
            </td>


        </tr>
        `;


    });


}





/* =====================================================
   HITUNG TOTAL SETORAN ANGGOTA
===================================================== */

function hitungTotalSetoranAnggota(
    firestoreId
){


    return DATA.setoran

    .filter(item=>

        item.idAnggota ===
        firestoreId

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.total || 0
        ),

        0

    );


}





/* =====================================================
   HITUNG TOTAL PENARIKAN ANGGOTA
===================================================== */

function hitungTotalPenarikanAnggota(
    firestoreId
){


    return DATA.penarikan

    .filter(item=>

        item.idAnggota ===
        firestoreId

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.nominal || 0
        ),

        0

    );


}






/* =====================================================
   HEADER REKAP RW
===================================================== */

function headerLaporanRW(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>Jumlah Anggota</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Total Saldo</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN REKAP RW
   HISTORI SEMUA WAKTU
===================================================== */

function tampilLaporanRW(){


    headerLaporanRW();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const daftarRW = [

        "1",
        "2",
        "3",
        "4",
        "5"

    ];



    let totalAnggota = 0;

    let totalSetoran = 0;

    let totalPenarikan = 0;

    let totalSaldo = 0;





    daftarRW.forEach(rw=>{


        const anggotaRW =

        DATA.anggota.filter(item=>{


            return String(item.rw)
            .replace(
                "RW ",
                ""
            )
            .trim()

            ===

            rw;


        });




        const idAnggota =

        anggotaRW.map(item=>

            item.firestoreId

        );




        const setoran =

        DATA.setoran

        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )

        .reduce(

            (total,item)=>

            total +

            Number(
                item.total || 0
            ),

            0

        );




        const penarikan =

        DATA.penarikan

        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )

        .reduce(

            (total,item)=>

            total +

            Number(
                item.nominal || 0
            ),

            0

        );




        const saldo =

        setoran -
        penarikan;



        totalAnggota +=
        anggotaRW.length;


        totalSetoran +=
        setoran;


        totalPenarikan +=
        penarikan;


        totalSaldo +=
        saldo;




        tbody.innerHTML +=


        `
        <tr>

            <td>
                RW ${rw}
            </td>


            <td>
                ${anggotaRW.length}
            </td>


            <td>
                ${formatRupiah(setoran)}
            </td>


            <td>
                ${formatRupiah(penarikan)}
            </td>


            <td>
                ${formatRupiah(saldo)}
            </td>


        </tr>
        `;


    });





    tbody.innerHTML +=


    `
    <tr>

        <th>Total</th>

        <th>
            ${totalAnggota}
        </th>

        <th>
            ${formatRupiah(totalSetoran)}
        </th>

        <th>
            ${formatRupiah(totalPenarikan)}
        </th>

        <th>
            ${formatRupiah(totalSaldo)}
        </th>

    </tr>
    `;


}