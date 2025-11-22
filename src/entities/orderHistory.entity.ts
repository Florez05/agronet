// Libraries
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Enums
import { OrderStatusEnum } from '@/enum';

// Entities
import { OrdersEntity, UsersEntity } from '.';

@Entity({ name: 'order_history' })
export class OrderHistoryEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        name: 'previous_status',
    })
    previousStatus: OrderStatusEnum;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        name: 'new_status',
    })
    newStatus: OrderStatusEnum;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column({
        type: 'timestamp with time zone',
        name: 'changed_at',
        default: () => 'now()',
    })
    changedAt: Date;

    @OneToOne(() => UsersEntity, user => user.orderHistoryId, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'changed_by', referencedColumnName: 'uuid' })
    changedById: UsersEntity;

    @ManyToOne(() => OrdersEntity, order => order.orderHistoryIds, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_uuid', referencedColumnName: 'uuid' })
    orderId: OrdersEntity;
}
