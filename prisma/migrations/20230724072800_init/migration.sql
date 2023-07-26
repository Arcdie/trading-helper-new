-- CreateTable
CREATE TABLE "instruments" (
    "instrument_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_futures" BOOLEAN NOT NULL,
    "price_precision" SMALLINT NOT NULL,
    "tick_size" DOUBLE PRECISION NOT NULL,
    "step_size" DOUBLE PRECISION NOT NULL,
    "average_volume_for_last_24_hours" INTEGER NOT NULL,
    "average_volume_for_last_15_minutes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instruments_pkey" PRIMARY KEY ("instrument_id")
);

-- CreateTable
CREATE TABLE "candles-5m" (
    "candle_id" SERIAL NOT NULL,
    "instrument_id" INTEGER NOT NULL,
    "data" DOUBLE PRECISION[],
    "volume" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candles-5m_pkey" PRIMARY KEY ("candle_id")
);

-- CreateTable
CREATE TABLE "candles-1h" (
    "candle_id" SERIAL NOT NULL,
    "instrument_id" INTEGER NOT NULL,
    "data" DOUBLE PRECISION[],
    "volume" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candles-1h_pkey" PRIMARY KEY ("candle_id")
);

-- CreateTable
CREATE TABLE "candles-1d" (
    "candle_id" SERIAL NOT NULL,
    "instrument_id" INTEGER NOT NULL,
    "data" DOUBLE PRECISION[],
    "volume" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candles-1d_pkey" PRIMARY KEY ("candle_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instruments_name_key" ON "instruments"("name");

-- CreateIndex
CREATE INDEX "candles-5m_instrument_id_time_idx" ON "candles-5m"("instrument_id", "time");

-- CreateIndex
CREATE INDEX "candles-1h_instrument_id_time_idx" ON "candles-1h"("instrument_id", "time");

-- CreateIndex
CREATE INDEX "candles-1d_instrument_id_time_idx" ON "candles-1d"("instrument_id", "time");

-- AddForeignKey
ALTER TABLE "candles-5m" ADD CONSTRAINT "candles-5m_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("instrument_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candles-1h" ADD CONSTRAINT "candles-1h_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("instrument_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candles-1d" ADD CONSTRAINT "candles-1d_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("instrument_id") ON DELETE RESTRICT ON UPDATE CASCADE;
