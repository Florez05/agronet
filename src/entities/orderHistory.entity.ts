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

    @OneToOne(() => UsersEntity, user => user.orderHistory, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'changed_by', referencedColumnName: 'uuid' })
    changedBy: UsersEntity;

    @ManyToOne(() => OrdersEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_uuid', referencedColumnName: 'uuid' })
    order: OrdersEntity;
}
