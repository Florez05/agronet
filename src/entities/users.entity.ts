// Libraries
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Enums
import { GenderEnum } from '@/enum';

// Entities
import { CredentialsEntity, OrderHistoryEntity, OrdersEntity, ReviewsEntity } from '.';

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'first_name',
    })
    firstName: string;

    @Column({
        type: 'varchar',
        name: 'last_name',
        length: 100,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    email: string;

    @Column({
        type: 'bigint',
        unique: true,
    })
    phone: number;

    @Column({
        type: 'date',
        name: 'date_of_birth',
    })
    dateOfBirth: Date;

    @Column({
        type: 'enum',
        enum: GenderEnum,
    })
    gender: GenderEnum;

    @Column({
        type: 'boolean',
        name: 'is_active',
        default: true,
    })
    isActive: boolean;

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

    @OneToOne(() => CredentialsEntity, credential => credential.user)
    credential: CredentialsEntity;

    @OneToMany(() => OrdersEntity, order => order.user)
    orders: OrdersEntity[];

    @OneToMany(() => ReviewsEntity, review => review.user)
    reviews: ReviewsEntity[];

    @OneToOne(() => OrderHistoryEntity, orderHistory => orderHistory.changedBy)
    orderHistory: OrderHistoryEntity;
}
