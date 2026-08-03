
/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : operasional.js

   Fungsi :
   - Controller modul operasional
===================================================== */


let editOperasionalId = null;




/* =====================================================
   INIT OPERASIONAL
===================================================== */

async function initOperasional(){


    console.log(

        "initOperasional berjalan"

    );



    resetFormOperasional();



    await loadOperasionalFirebase();

tampilOperasional();

updateDashboard();

eventOperasional();


}


/* =====================================================
   EVENT OPERASIONAL
===================================================== */

function eventOperasional(){



    const btnSimpan =

    el("btnSimpanOperasional");



    if(btnSimpan){


        btnSimpan.onclick =

        simpanOperasional;


    }





    const btnUpdate =

    el("btnUpdateOperasional");



    if(btnUpdate){


        btnUpdate.onclick =

        updateOperasional;


    }





    const btnBatal =

    el("btnBatalOperasional");



    if(btnBatal){


        btnBatal.onclick =

        resetFormOperasional;


    }





    const tanggal =

    el("txtTanggalOperasional");



    if(tanggal){


        tanggal.onchange = ()=>{


            setValue(

                "txtHariOperasional",

                getNamaHari(

                    getValue(

                        "txtTanggalOperasional"

                    )

                )

            );


        };


    }

el("btnFilterOperasional")
.onclick =
tampilOperasional;

el("btnResetFilterOperasional")
.onclick =
resetFilterOperasional;
}





/* =====================================================
   SIMPAN OPERASIONAL
===================================================== */

async function simpanOperasional(){



    const kategori =

    getValue(

        "cmbKategoriOperasional"

    );



    const uraian =

    getValue(

        "txtUraianOperasional"

    );



    const nominal =

    getNumber(

        "txtNominalOperasional"

    );



    if(!kategori){


        alert(

            "Kategori belum dipilih"

        );


        return;


    }



    if(!uraian){


        alert(

            "Uraian belum diisi"

        );


        return;


    }



    if(nominal<=0){


        alert(

            "Nominal belum diisi"

        );


        return;


    }



    const data = {


        tanggal:

        getValue(

            "txtTanggalOperasional"

        ),



        hari:

        getValue(

            "txtHariOperasional"

        ),



        kategori:



        kategori,



        uraian:



        uraian,



        nominal:



        nominal,



        waktuInput:

        new Date()


    };



    try{


        await simpanOperasionalFirebase(

            data

        );



        tampilOperasional();

updateDashboard();

        resetFormOperasional();



        alert(

            "Data operasional berhasil disimpan"

        );



    }catch(error){


        console.error(error);



        alert(

            "Gagal menyimpan data operasional"

        );


    }


}





/* =====================================================
   EDIT OPERASIONAL
===================================================== */

function editOperasional(

    firestoreId

){



    const data =

    DATA.operasional.find(item=>


        item.firestoreId===firestoreId


    );



    if(!data)

    return;



    editOperasionalId =

    firestoreId;



    setValue(

        "txtTanggalOperasional",

        data.tanggal

    );



    setValue(

        "txtHariOperasional",

        data.hari

    );



    setValue(

        "cmbKategoriOperasional",

        data.kategori

    );



    setValue(

        "txtUraianOperasional",

        data.uraian

    );



    setValue(

        "txtNominalOperasional",

        data.nominal

    );



    disable(

        "btnSimpanOperasional"

    );



    enable(

        "btnUpdateOperasional"

    );



    enable(

        "btnBatalOperasional"

    );


}





/* =====================================================
   UPDATE OPERASIONAL
===================================================== */

async function updateOperasional(){


    if(!editOperasionalId)

    return;



    const data = {


        tanggal:

        getValue(

            "txtTanggalOperasional"

        ),



        hari:

        getValue(

            "txtHariOperasional"

        ),



        kategori:

        getValue(

            "cmbKategoriOperasional"

        ),



        uraian:

        getValue(

            "txtUraianOperasional"

        ),



        nominal:

        getNumber(

            "txtNominalOperasional"

        ),



        waktuUpdate:

        new Date()


    };



    try{


        await updateOperasionalFirebase(

            editOperasionalId,

            data

        );



        await loadOperasionalFirebase();



        tampilOperasional();



        resetFormOperasional();

updateDashboard();

        editOperasionalId = null;



        alert(

            "Data operasional diperbarui"

        );


    }catch(error){


        console.error(error);



        alert(

            "Update gagal"

        );


    }


}





/* =====================================================
   HAPUS OPERASIONAL
===================================================== */

async function hapusOperasional(

    firestoreId

){


    if(!confirm(

        "Hapus data operasional?"

    ))

    return;



    try{


        await hapusOperasionalFirebase(

            firestoreId

        );



        DATA.operasional =

        DATA.operasional.filter(item=>


            item.firestoreId!==firestoreId


        );



        tampilOperasional();

updateDashboard();

    }catch(error){


        console.error(error);



        alert(

            "Hapus gagal"

        );


    }


}

