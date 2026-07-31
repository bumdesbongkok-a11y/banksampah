/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : setoran.ui.js

   Fungsi :
   - Tampilan modul setoran
===================================================== */



/* =====================================================
   ISI DROPDOWN RW SETORAN
===================================================== */

function isiDropdownRWSetoran(){


    const select =

    el("cmbRWSetoranInput");


    if(!select) return;



    select.innerHTML = `

    <option value="">

        -- Pilih RW --

    </option>

    `;



    DAFTAR_RW.forEach(rw=>{


        select.innerHTML += `

        <option value="${rw}">

            RW ${rw}

        </option>

        `;


    });


}





/* =====================================================
   ISI DROPDOWN ANGGOTA
===================================================== */

function isiDropdownAnggotaSetoran(){


    const select =

    el("cmbAnggota");


    if(!select) return;



    select.innerHTML = `

    <option value="">

        -- Pilih Anggota --

    </option>

    `;



    const rw =

    getValue(

        "cmbRWSetoranInput"

    );



    DATA.anggota

.filter(item=>{

    /* Jika RW belum dipilih,
       jangan tampilkan anggota */

    if(!rw){

        return false;

    }

    return String(item.rw)
        .replace("RW ","")
        .trim() ===
        String(rw)
        .replace("RW ","")
        .trim();

})

.forEach(item=>{

    select.innerHTML += `

    <option value="${item.firestoreId}">

        ${item.nama}

    </option>

    `;

});


}





/* =====================================================
   ISI DROPDOWN BARANG
===================================================== */

function isiDropdownBarangSetoran(){


    const select =

    el("cmbJenisBarang");


    if(!select) return;



    select.innerHTML = `

    <option value="">

        -- Pilih Barang --

    </option>

    `;



    DATA.harga.forEach(item=>{


        select.innerHTML += `

        <option value="${item.firestoreId}">

            ${item.jenisBarang}

        </option>

        `;


    });


}





/* =====================================================
   AMBIL HARGA BARANG
===================================================== */

function pilihHargaSetoran(){


    const idHarga =

    getValue(

        "cmbJenisBarang"

    );



    const harga =

    DATA.harga.find(item=>


        item.firestoreId === idHarga


    );



    if(!harga){


        setValue(

            "txtHargaSetoran",

            ""

        );


        return;

    }



    setValue(

        "txtHargaSetoran",

        harga.harga

    );



    hitungTotalSetoran();


}





/* =====================================================
   HITUNG TOTAL
===================================================== */

function hitungTotalSetoran(){


    const berat =

    getNumber(

        "txtBerat"

    );



    const harga =

    getNumber(

        "txtHargaSetoran"

    );



    const total =

    hitungTotal(

        berat,

        harga

    );



    setValue(

        "txtTotal",

        total

    );


}

/* =====================================================
   DROPDOWN RW FILTER SETORAN
===================================================== */

function isiDropdownRWFilterSetoran(){

    const select =
    el("cmbRWSetoran");

    if(!select) return;

    select.innerHTML = `

    <option value="">

        -- Semua RW --

    </option>

    `;

    DAFTAR_RW.forEach(rw=>{

        select.innerHTML += `

        <option value="${rw}">

            RW ${rw}

        </option>

        `;

    });

}

/* =====================================================
   DROPDOWN FILTER ANGGOTA SETORAN
===================================================== */

function isiDropdownFilterAnggotaSetoran(){

    const select =
    el("cmbFilterAnggotaSetoran");

    if(!select) return;

    select.innerHTML = `

    <option value="">

        -- Semua Anggota --

    </option>

    `;

    const rw = getValue("cmbRWSetoran");

    DATA.anggota

    .filter(item=>{

        // Belum pilih RW
        if(!rw){

            return false;

        }

        return String(item.rw)
            .replace("RW ","")
            .trim() ===
            String(rw)
            .replace("RW ","")
            .trim();

    })

    .sort((a,b)=>

        a.nama.localeCompare(b.nama)

    )

    .forEach(item=>{

        select.innerHTML += `

        <option value="${item.firestoreId}">

            ${item.nama}

        </option>

        `;

    });

}


/* =====================================================
   TAMPIL SETORAN
===================================================== */

function tampilSetoran(){

    const tbody =
    document.querySelector(
        "#tblSetoran tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    const tanggal =
    getValue("txtFilterTanggal");

    const rw =
    getValue("cmbRWSetoran");

    const anggota =
    getValue("cmbFilterAnggotaSetoran");

    const dataFilter =
    DATA.setoran.filter(item=>{

        if(
            tanggal &&
            item.tanggal !== tanggal
        ){

            return false;

        }

        if(rw){

            if(
                String(item.rw)
                .replace("RW ","")
                .trim() !==
                String(rw)
                .replace("RW ","")
                .trim()
            ){

                return false;

            }

        }

        if(
            anggota &&
            item.idAnggota !== anggota
        ){

            return false;

        }

        return true;

    });

    if(dataFilter.length===0){

        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                Belum ada data setoran

            </td>

        </tr>

        `;

        updateDashboardSetoran([]);

        return;

    }

    dataFilter.forEach(item=>{

        tbody.innerHTML += `

        <tr>

            <td>

                ${item.tanggal || ""}

            </td>

            <td>

                ${item.namaAnggota || ""}

            </td>

            <td>

                ${item.jenisBarang || ""}

            </td>

            <td>

                ${formatRupiah(item.total)}

            </td>

            <td>

                <button
                class="btn"
                onclick="editSetoran('${item.firestoreId}')">

                    ✏️

                </button>

                <button
                class="btn"
                onclick="hapusSetoran('${item.firestoreId}')">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboardSetoran(dataFilter);

}

/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboardSetoran(data){


    setText(

        "dashTotalTransaksi",

        data.length

    );



    const total =

    data.reduce(

        (jumlah,item)=>{


            return jumlah +

            Number(item.total || 0);


        },

        0

    );



    setText(

        "dashTotalSetoran",

        formatRupiah(total)

    );


}





/* =====================================================
   RESET FORM
===================================================== */

function resetFormSetoran(){


    setValue(

        "txtTanggal",

        new Date()

        .toISOString()

        .slice(0,10)

    );


    setValue(

        "txtHari",

        getNamaHari(

            getValue("txtTanggal")

        )

    );


    setValue(

        "cmbRWSetoranInput",

        ""

    );


    setValue(

        "cmbAnggota",

        ""

    );


    setValue(

        "cmbJenisBarang",

        ""

    );


    setValue(

        "txtBerat",

        ""

    );


    setValue(

        "txtHargaSetoran",

        ""

    );


    setValue(

        "txtTotal",

        ""

    );


    disable(

        "btnUpdateSetoran"

    );


    disable(

        "btnBatalSetoran"

    );


    enable(

        "btnSimpanSetoran"

    );


}