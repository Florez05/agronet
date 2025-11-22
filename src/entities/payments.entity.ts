// Libraries
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Enums
import { PaymentStatus, PaymentType } from '@/enum';

// Entities
import { OrdersEntity } from '.';

@Entity({ name: 'payments' })
export class PaymentsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
    })
    amount: number;

    @Column({
        type: 'enum',
        enum: PaymentType,
    })
    method: PaymentType;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({
        type: 'timestamp with time zone',
        name: 'paid_at',
    })
    paidAt: Date;

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

    @OneToOne(() => OrdersEntity, order => order.paymentId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_uuid', referencedColumnName: 'uuid' })
    orderId: OrdersEntity;
}
