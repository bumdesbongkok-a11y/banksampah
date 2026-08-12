/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : anggota.ui.js

   Fungsi :
   - Tampilan modul anggota
===================================================== */



/* =====================================================
   TAMPIL DATA ANGGOTA
===================================================== */

function tampilAnggota(){


    const tbody =
    document.querySelector(
        "#tblAnggota tbody"
    );


    if(!tbody) return;



    tbody.innerHTML = "";



    let data =
    [...DATA.anggota];



    const cari =
    getValue(
        "txtCariAnggota"
    )
    .toLowerCase();



    if(cari){


        data =
        data.filter(item =>

            item.nama
            .toLowerCase()
            .includes(cari)

        );


    }



    if(data.length === 0){


        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                Belum ada data anggota

            </td>

        </tr>

        `;


        updateDashboardAnggota();

        return;

    }




    data.forEach((item,index)=>{


        tbody.innerHTML += `

        <tr>

            <td>
                ${index+1}
            </td>


            <td>
                ${item.idAnggota || ""}
            </td>


            <td>
                ${item.nama || ""}
            </td>


           <td> RW ${getNomorRW(item.rw)} </td>


            <td>


                <button
                class="btn"
                onclick="
                editAnggota('${item.firestoreId}')
                ">

                ✏️

                </button>



                <button
                class="btn"
                onclick="
                hapusAnggota('${item.firestoreId}')
                ">

                🗑️

                </button>


            </td>

        </tr>

        `;


    });



    updateDashboardAnggota();


}

/* =====================================================
   NORMALISASI RW
===================================================== */

function getNomorRW(value){

    if(value === null || value === undefined){
        return "";
    }


    const teks =
    String(value).trim();


    const hasil =
    teks.match(/[1-5]/);


    return hasil
        ? hasil[0]
        : "";
}

/* =====================================================
   DASHBOARD ANGGOTA
===================================================== */

function updateDashboardAnggota(){

    setText(
        "dashTotalAnggota",
        DATA.anggota.length
    );


    for(let i = 1; i <= 5; i++){

        const jumlah =
        DATA.anggota.filter(item => {

            const rw =
            String(item.rw || "")
            .trim()
            .toUpperCase();


            return (
                rw === String(i) ||
                rw === "RW " + i ||
                rw === "RW" + i
            );

        }).length;


        setText(
            "dashRW" + i,
            jumlah
        );

    }

}


/* =====================================================
   ISI FORM EDIT
===================================================== */

function isiFormAnggota(item){


    setValue(

        "txtIdAnggota",

        item.idAnggota

    );


    setValue(

        "txtNama",

        item.nama

    );


    setValue(

        "cmbRW",

        item.rw

    );

	el("chkIkutRanking").checked =
    item.ikutRanking !== false;

    disable(
        "btnSimpanAnggota"
    );


    enable(
        "btnUpdateAnggota"
    );


    enable(
        "btnBatalAnggota"
    );

}





/* =====================================================
   RESET FORM ANGGOTA
===================================================== */

function resetFormAnggota(){


    setValue(
        "txtIdAnggota",
        ""
    );


    setValue(
        "txtNama",
        ""
    );


    setValue(
        "cmbRW",
        ""
    );



    enable(
        "btnSimpanAnggota"
    );


    disable(
        "btnUpdateAnggota"
    );


    disable(
        "btnBatalAnggota"
    );



    generateIdAnggota();


}





/* =====================================================
   GENERATE ID ANGGOTA
===================================================== */

function generateIdAnggota(){

    if(DATA.anggota.length === 0){

        setValue("txtIdAnggota","BS0001");

        return;

    }

    let nomorTerbesar = 0;

    DATA.anggota.forEach(item=>{

        const nomor = Number(
            item.idAnggota.replace(PREFIX.anggota,"")
        );

        if(nomor > nomorTerbesar){

            nomorTerbesar = nomor;

        }

    });

    const idBaru =
        PREFIX.anggota +
        String(nomorTerbesar + 1).padStart(4,"0");

    setValue(
        "txtIdAnggota",
        idBaru
    );

}
