-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESS', 'FINISHED');

-- CreateTable
CREATE TABLE "pelanggan" (
    "id_pelanggan" TEXT NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(110) NOT NULL,
    "phone" VARCHAR(110) NOT NULL,
    "tgl_registrasi" TIMESTAMP(0) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "password" VARCHAR(110) NOT NULL,

    CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id_kategori" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "produk" (
    "idproduk" TEXT NOT NULL,
    "namaproduk" TEXT NOT NULL,
    "idkategori" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DECIMAL(20,0) NOT NULL,
    "stok" INTEGER NOT NULL,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("idproduk")
);

-- CreateTable
CREATE TABLE "alamat" (
    "id_alamat" TEXT NOT NULL,
    "id_pelanggan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nomorhp" TEXT NOT NULL,
    "detail_alamat" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "createdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("id_alamat")
);

-- CreateTable
CREATE TABLE "order" (
    "id_order" TEXT NOT NULL,
    "id_pelanggan" TEXT NOT NULL,
    "tanggal_pemesanan" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "tanggal_kirim" TIMESTAMP(0) NOT NULL,
    "tanggal_selesai" TIMESTAMP(0) NOT NULL,
    "total_pembayaran" DECIMAL(65,30) NOT NULL,
    "id_alamat" TEXT NOT NULL,
    "id_pembayaran" TEXT NOT NULL,
    "id_pengiriman" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "order_produk" (
    "id_order_produk" TEXT NOT NULL,
    "id_order" TEXT NOT NULL,
    "id_produk" TEXT NOT NULL,
    "jml" INTEGER NOT NULL,
    "harga" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "order_produk_pkey" PRIMARY KEY ("id_order_produk")
);

-- CreateTable
CREATE TABLE "metode_pembayaran" (
    "id_metode_pembayaran" TEXT NOT NULL,
    "metode_pembayaran" TEXT NOT NULL,

    CONSTRAINT "metode_pembayaran_pkey" PRIMARY KEY ("id_metode_pembayaran")
);

-- CreateTable
CREATE TABLE "kurir" (
    "id_kurir" TEXT NOT NULL,
    "nama_kurir" TEXT NOT NULL,
    "estimasi_pengiriman" TEXT NOT NULL,

    CONSTRAINT "kurir_pkey" PRIMARY KEY ("id_kurir")
);

-- CreateTable
CREATE TABLE "keranjang" (
    "id" TEXT NOT NULL,
    "id_pelanggan" TEXT NOT NULL,
    "id_produk" TEXT NOT NULL,

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pelanggan_email_key" ON "pelanggan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pelanggan_phone_key" ON "pelanggan"("phone");

-- CreateIndex
CREATE INDEX "user_fk_1" ON "pelanggan"("email");

-- CreateIndex
CREATE INDEX "user_fk_2" ON "pelanggan"("phone");

-- CreateIndex
CREATE INDEX "address_fk_1" ON "alamat"("id_pelanggan");

-- CreateIndex
CREATE INDEX "order_fk_1" ON "order"("id_alamat");

-- CreateIndex
CREATE INDEX "order_fk_2" ON "order"("id_pembayaran");

-- CreateIndex
CREATE INDEX "order_fk_3" ON "order"("id_pengiriman");

-- CreateIndex
CREATE INDEX "product_order_fk_1" ON "order_produk"("id_order");

-- CreateIndex
CREATE INDEX "product_order_fk_2" ON "order_produk"("id_produk");

-- CreateIndex
CREATE INDEX "chart_fk_1" ON "keranjang"("id_pelanggan");

-- CreateIndex
CREATE INDEX "chart_fk_2" ON "keranjang"("id_produk");

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_idkategori_fkey" FOREIGN KEY ("idkategori") REFERENCES "kategori"("id_kategori") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_alamat_fkey" FOREIGN KEY ("id_alamat") REFERENCES "alamat"("id_alamat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_pembayaran_fkey" FOREIGN KEY ("id_pembayaran") REFERENCES "metode_pembayaran"("id_metode_pembayaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_id_pengiriman_fkey" FOREIGN KEY ("id_pengiriman") REFERENCES "kurir"("id_kurir") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_produk" ADD CONSTRAINT "order_produk_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_produk" ADD CONSTRAINT "order_produk_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "produk"("idproduk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "produk"("idproduk") ON DELETE RESTRICT ON UPDATE CASCADE;
