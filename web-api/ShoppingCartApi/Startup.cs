using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShoppingCartBusinessLayer.cs.OrderServices;
using ShoppingCartBusinessLayer.DiscountService;
using ShoppingCartBusinessLayer.ItemServices;
using ShoppingCartDataLayer.Context;
using ShoppingCartDataLayer.Repository.Discounts;
using ShoppingCartDataLayer.Repository.Items;
using ShoppingCartDataLayer.Repository.Orders;

namespace ShoppingCartApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();
            corsBuilder.AllowCredentials();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<DatabaseContext>();

            services.AddTransient<IItemsRepository, ItemsRespository>();
            services.AddTransient<IDiscountsRepository, DiscountsRepository>();
            services.AddTransient<IOrdersRepository, OrderRepository>();

            services.AddTransient<IOrderServices, OrderServices>();
            services.AddTransient<IDiscountService, DiscountService>();
            services.AddTransient<IItemServices, ItemService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("AllowAllHeaders");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
