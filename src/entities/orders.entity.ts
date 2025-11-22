// Libraries
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Enums
import { OrderStatusEnum } from '@/enum';

// Entities
import { OrderDetailsEntity, OrderHistoryEntity, PaymentsEntity, UsersEntity } from '.';

@Entity({ name: 'orders' })
export class OrdersEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        default: 0,
    })
    total: number;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        default: OrderStatusEnum.PENDING,
    })
    status: OrderStatusEnum;

    @Column({
        type: 'timestamp with time zone',
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp with time zone',
        name: 'updated_at',
        default: () => 'now()',
    })
    updatedAt: Date;

    @Column({
        type: 'timestamp with time zone',
        name: 'deleted_at',
        nullable: true,
    })
    deletedAt: Date | null;

    @ManyToOne(() => UsersEntity, user => user.ordersIds, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
    userId: UsersEntity;

    @OneToMany(() => OrderHistoryEntity, orderHistory => orderHistory.orderId)
    orderHistoryIds: OrderHistoryEntity[];

    @OneToMany(() => OrderDetailsEntity, orderDetails => orderDetails.orderId)
    orderDetailsIds: OrderDetailsEntity[];

    @OneToOne(() => PaymentsEntity, payment => payment.orderId)
    paymentId: PaymentsEntity;
}
