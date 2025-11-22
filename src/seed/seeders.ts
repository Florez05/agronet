// Libraries
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

// Constants
import {
    CATEGORIES_DATA,
    CREDENTIALS_DATA,
    ORDER_DETAILS_DATA,
    ORDER_HISTORY_DATA,
    ORDERS_DATA,
    PAYMENT_DATA,
    PRODUCTS_DATA,
    REVIEWS_DATA,
    USERS_DATA,
} from './seeders.constants';

// Config
import { connectionSource } from '@/config';

// Entities
import {
    CategoriesEntity,
    CredentialsEntity,
    OrderDetailsEntity,
    OrderHistoryEntity,
    OrdersEntity,
    PaymentsEntity,
    ProductsEntity,
    ReviewsEntity,
    UsersEntity,
} from '@/entities';

const logger = new Logger('Seeders');

export async function seedUsers() {
    const usersRepository = connectionSource.getRepository(UsersEntity);
    await usersRepository.insert(USERS_DATA);
    logger.verbose(`🧑 Usuarios creados correctamente`);
}

export async function seedCredentials() {
    const credentialsRepository = connectionSource.getRepository(CredentialsEntity);
    const newCredentials = await Promise.all(
        CREDENTIALS_DATA.map(async credential => {
            const hashedPassword = await bcrypt.hash(credential.password!, 10);
            return {
                ...credential,
                password: hashedPassword,
            };
        }),
    );
    await credentialsRepository.insert(newCredentials);
    logger.verbose(`🔐 Credenciales creadas correctamente`);
}

export async function seedProducts() {
    const productsRepository = connectionSource.getRepository(ProductsEntity);
    await productsRepository.insert(PRODUCTS_DATA);
    logger.verbose(`📦 Productos creados correctamente`);
}

export async function seedCategories() {
    const categoriesRepository = connectionSource.getRepository(CategoriesEntity);
    await categoriesRepository.save(CATEGORIES_DATA);
    logger.verbose(`🏷️ Categorías creadas correctamente`);
}

export async function seedReviews() {
    const reviewRepository = connectionSource.getRepository(ReviewsEntity);
    await reviewRepository.save(REVIEWS_DATA);
    logger.verbose(`📝 Reseñas creadas correctamente`);
}

export async function seedOrders() {
    const ordersRepository = connectionSource.getRepository(OrdersEntity);
    await ordersRepository.save(ORDERS_DATA);
    logger.verbose(`🛒 Órdenes creadas correctamente`);
}

export async function seedOrderDetails() {
    const orderDetailsRepository = connectionSource.getRepository(OrderDetailsEntity);
    await orderDetailsRepository.save(ORDER_DETAILS_DATA);
    logger.verbose(`📋 Detalles de órdenes creados correctamente`);
}

export async function seedOrderHistory() {
    const orderHistoryRepository = connectionSource.getRepository(OrderHistoryEntity);
    await orderHistoryRepository.save(ORDER_HISTORY_DATA);
    logger.verbose(`📜 Historial de órdenes creado correctamente`);
}

export async function seedPayments() {
    const paymentRepository = connectionSource.getRepository(PaymentsEntity);
    await paymentRepository.save(PAYMENT_DATA);
    logger.verbose(`💳 Pagos creados correctamente`);
}
