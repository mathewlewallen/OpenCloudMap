CREATE TABLE `purchased_item` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`userId` text NOT NULL,
	`itemType` text NOT NULL,
	`itemId` text NOT NULL,
	`purchasedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `purchased_item_user_id_idx` ON `purchased_item` (`userId`);--> statement-breakpoint
CREATE INDEX `purchased_item_type_idx` ON `purchased_item` (`itemType`);--> statement-breakpoint
CREATE INDEX `purchased_item_user_item_idx` ON `purchased_item` (`userId`,`itemType`,`itemId`);--> statement-breakpoint
ALTER TABLE `credit_transaction` ADD `remainingAmount` integer DEFAULT 0 NOT NULL;