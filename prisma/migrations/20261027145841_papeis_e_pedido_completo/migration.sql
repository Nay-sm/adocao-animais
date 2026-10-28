/*
  Warnings:

  - You are about to drop the column `mensagem` on the `PedidoAdocao` table. All the data in the column will be lost.
  - Added the required column `experiencia` to the `PedidoAdocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moradia` to the `PedidoAdocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivo` to the `PedidoAdocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `PedidoAdocao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PedidoAdocao" DROP CONSTRAINT "PedidoAdocao_animalId_fkey";

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "porte" TEXT NOT NULL DEFAULT 'Médio',
ADD COLUMN     "sexo" TEXT NOT NULL DEFAULT 'Não informado';

-- AlterTable
ALTER TABLE "PedidoAdocao" DROP COLUMN "mensagem",
ADD COLUMN     "experiencia" TEXT NOT NULL,
ADD COLUMN     "moradia" TEXT NOT NULL,
ADD COLUMN     "motivo" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PedidoAdocao" ADD CONSTRAINT "PedidoAdocao_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
