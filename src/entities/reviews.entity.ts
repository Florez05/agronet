// Libraries
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { ProductsEntity, UsersEntity } from '.';

@Entity({ name: 'reviews' })
export class ReviewsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'smallint' })
    rating: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean', default: false })
    anonymous: boolean;

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

    @ManyToOne(() => UsersEntity, user => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
    user: UsersEntity;

    @ManyToOne(() => ProductsEntity, product => product.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
    product: ProductsEntity;
}
