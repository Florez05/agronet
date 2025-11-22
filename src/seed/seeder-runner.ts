// Libraries
import 'reflect-metadata';

// Seeders
import {
    seedCategories,
    seedCredentials,
    seedOrderDetails,
    seedOrderHistory,
    seedOrders,
    seedPayments,
    seedProducts,
    seedReviews,
    seedUsers,
} from './seeders';

// Config
import { connectionSource } from '@/config';

async function clearDatabase() {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    console.log('🗑  Eliminando todos los registros de la base de datos...');

    await queryRunner.startTransaction();
    try {
        // Obtener todas las tablas del esquema 'public' (ajusta si usas otro esquema)
        const tables = (await queryRunner.query(
            `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`,
        )) as { table_name: string }[];

        // Opcional: excluir la tabla de migraciones si quieres conservarla
        const excluded = ['migrations']; // <- ajusta o deja vacío
        const tableNames = tables.map(t => t.table_name).filter(name => !excluded.includes(name));

        if (tableNames.length > 0) {
            // Construir la lista de tablas entre comillas dobles para Postgres
            const quoted = tableNames.map(n => `"${n}"`).join(', ');
            // TRUNCATE con RESTART IDENTITY para reiniciar secuencias y CASCADE para respetar FKs
            await queryRunner.query(`TRUNCATE TABLE ${quoted} RESTART IDENTITY CASCADE;`);
        }

        await queryRunner.commitTransaction();
        console.log('✅ Base de datos limpiada correctamente.');
    } catch (error) {
        console.error('❌ Error al limpiar la base de datos:', error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}

connectionSource
    .initialize()
    .then(async () => {
        await clearDatabase();
        console.log('🔄 Ejecutando seeders...');
        await seedUsers();
        await seedCredentials();
        await seedProducts();
        await seedCategories();
        await seedReviews();
        await seedOrders();
        await seedOrderDetails();
        await seedOrderHistory();
        await seedPayments();
        console.log('✅ Seeders ejecutados');
        process.exit();
    })
    .catch(error => console.log(error));
