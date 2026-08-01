/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : app.js
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* Navigation */

     eventNavigation();

    /* Modul */

     await initAnggota();

    await initHarga();

    await initSetoran();

   await initPenjualan();
   
    await initPenarikan();
	
    await initLaporan();
	
	await initOperasional();
	
	await initKeuangan();
		
    await initPengaturan();
	
	await initDashboard();

    /* Tampilkan halaman awal */

    initNavigation();


    console.log("Aplikasi Bank Sampah V3 siap.");

});