// Libraries
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { ProductsEntity } from '.';

@Entity({ name: 'categories' })
export class CategoriesEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'text' })
    description: string;

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

    @ManyToMany(() => ProductsEntity, product => product.categories)
    @JoinTable({
        name: 'categories_products',
        joinColumn: {
            name: 'category_uuid',
            referencedColumnName: 'uuid',
        },
        inverseJoinColumn: {
            name: 'product_uuid',
            referencedColumnName: 'uuid',
        },
    })
    products: ProductsEntity[];
}
