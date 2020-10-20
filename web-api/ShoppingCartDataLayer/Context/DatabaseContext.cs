using Microsoft.EntityFrameworkCore;
using ShoppingCartDataLayer.Models;

namespace ShoppingCartDataLayer.Context
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) 
            => options.UseSqlite("Data Source=shoppingcart.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var discount = new Discount
            {
                Id = 1,
                Percentage = 10,
                HasBeenApplied = false
            };

            modelBuilder.Entity<Discount>().HasData(discount);

            modelBuilder.Entity<Item>().HasData(new {
                Id = 1,
                Name = "Kit Kats",
                Description = "Have a break, have a kit kat",
                Price = 1.10M
            });

           
        }
    }
}
