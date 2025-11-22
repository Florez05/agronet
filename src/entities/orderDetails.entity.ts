// Libraries
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { OrdersEntity, ProductsEntity } from '.';

@Entity({ name: 'order_details' })
export class OrderDetailsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        default: 0,
    })
    subtotal: number;

    @Column({
        type: 'timestamp with time zone',
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @ManyToOne(() => OrdersEntity, order => order.orderDetailsIds, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'order_uuid', referencedColumnName: 'uuid' })
    orderId: OrdersEntity;

    @ManyToOne(() => ProductsEntity, product => product.orderDetailsIds, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
    productId: ProductsEntity;
}
