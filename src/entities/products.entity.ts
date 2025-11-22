// Libraries
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { CategoriesEntity, OrderDetailsEntity, ReviewsEntity } from '.';

@Entity({ name: 'products' })
export class ProductsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        default: 0,
    })
    price: number;

    @Column({
        type: 'boolean',
        default: true,
    })
    active: boolean;

    @Column({ type: 'int', default: 0 })
    stock: number;

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
    })
    deletedAt: Date;

    @OneToMany(() => ReviewsEntity, review => review.product)
    reviews: ReviewsEntity[];

    @ManyToMany(() => CategoriesEntity, category => category.products)
    categories: CategoriesEntity[];

    @OneToMany(() => OrderDetailsEntity, orderDetail => orderDetail.product)
    orderDetails: OrderDetailsEntity[];
}
