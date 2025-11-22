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

// Enums
import { GenderEnum, OrderStatusEnum, PaymentStatus, PaymentType, RolesEnum } from '@/enum';

const UUID = {
    USER_1: '9fc0d712-7ebe-43e8-9383-97383499c1d7',
    USER_2: 'd0adb442-4bb6-4b1e-a956-8387ea3176b3',
    CREDENTIAL_1: 'a57d49a9-091a-4a63-be8b-2427c2dcc9a9',
    PRODUCT_1: 'a7e3fa70-6855-4e05-b98f-1529a2bba9c6',
    PRODUCT_2: '6cf592bc-b4a4-452d-8efd-83149b3eea53',
    CATEGORY_1: '347a6c1a-0f02-49f5-bdf9-a5cd05e74bfb',
    REVIEW_1: 'd3bdd326-67d4-48e4-90d6-f69089510909',
    ORDER_1: 'e00baf22-eada-436d-bb1c-a0c1b218e61b',
    ORDER_DETAIL_1: '375621b9-f54f-4fc9-82ec-d09dc60363d0',
    ORDER_HISTORY_1: '32f75002-20c6-40b2-b017-5662daa5c9a6',
    PAYMENT_1: 'dccfc8b2-7aae-4f18-b492-1d99399a3867',
};

export const USERS_DATA: Partial<UsersEntity>[] = [
    {
        uuid: UUID.USER_1,
        firstName: 'Sergio',
        lastName: 'Florez',
        email: 'sergio.florez@example.com',
        phone: 3143997808,
        dateOfBirth: new Date('2002/10/05'),
        gender: GenderEnum.MALE,
    },
    {
        uuid: UUID.USER_2,
        firstName: 'Angy',
        lastName: 'Ariza',
        email: 'angy.ariza@example.com',
        phone: 3151234567,
        dateOfBirth: new Date('2001/12/10'),
        gender: GenderEnum.FEMALE,
    },
];

export const CREDENTIALS_DATA: Partial<CredentialsEntity>[] = [
    {
        uuid: UUID.CREDENTIAL_1,
        username: 'sergio.florez',
        password: 'securePass123!',
        rol: RolesEnum.ADMIN,
        lastLoginAt: new Date(),
        userId: {
            uuid: UUID.USER_1,
        } as UsersEntity,
    },
];

export const PRODUCTS_DATA: Partial<ProductsEntity>[] = [
    {
        uuid: UUID.PRODUCT_1,
        name: 'Smartphone XYZ',
        description: 'A high-end smartphone with a sleek design and powerful features.',
        price: 809.0,
        stock: 50,
    },
    {
        uuid: UUID.PRODUCT_2,
        name: 'Laptop ABC',
        description: 'A lightweight laptop perfect for work and entertainment on the go.',
        price: 1199.0,
        stock: 30,
    },
];

export const CATEGORIES_DATA: Partial<CategoriesEntity>[] = [
    {
        uuid: UUID.CATEGORY_1,
        name: 'Electronics',
        description: 'Devices and gadgets including phones, laptops, and accessories.',
        createdAt: new Date(),
        updatedAt: new Date(),
        productsIds: [{ uuid: UUID.PRODUCT_1 }, { uuid: UUID.PRODUCT_2 }] as ProductsEntity[],
    },
];

export const REVIEWS_DATA: Partial<ReviewsEntity>[] = [
    {
        uuid: UUID.REVIEW_1,
        rating: 5,
        description: 'Excellent product! Highly recommend it.',
        userId: { uuid: UUID.USER_1 } as UsersEntity,
        productId: { uuid: UUID.PRODUCT_1 } as ProductsEntity,
    },
];

export const ORDERS_DATA: Partial<OrdersEntity>[] = [
    {
        uuid: UUID.ORDER_1,
        total: 809.0,
        status: OrderStatusEnum.CONFIRMED,
        userId: { uuid: UUID.USER_1 } as UsersEntity,
    },
];

export const ORDER_DETAILS_DATA: Partial<OrderDetailsEntity>[] = [
    {
        uuid: UUID.ORDER_DETAIL_1,
        quantity: 1,
        subtotal: 809.0,
        orderId: { uuid: UUID.ORDER_1 } as OrdersEntity,
        productId: { uuid: UUID.PRODUCT_1 } as ProductsEntity,
    },
];

export const ORDER_HISTORY_DATA: Partial<OrderHistoryEntity>[] = [
    {
        uuid: UUID.ORDER_HISTORY_1,
        previousStatus: OrderStatusEnum.PENDING,
        newStatus: OrderStatusEnum.CONFIRMED,
        note: 'Order confirmed by the user.',
        changedById: { uuid: UUID.USER_1 } as UsersEntity,
        orderId: { uuid: UUID.ORDER_1 } as OrdersEntity,
    },
];

export const PAYMENT_DATA: Partial<PaymentsEntity>[] = [
    {
        uuid: UUID.PAYMENT_1,
        amount: 809.0,
        method: PaymentType.DEBIT_CARD,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
        orderId: { uuid: UUID.ORDER_1 } as OrdersEntity,
    },
];
