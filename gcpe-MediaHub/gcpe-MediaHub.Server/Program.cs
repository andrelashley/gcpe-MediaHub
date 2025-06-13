using gcpe_MediaHub.Server.Data;
using gcpe_MediaHub.Server.Models.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IMediaContactRepository, MediaContactRepository>();
builder.Services.AddScoped<IMediaOutletRepository, MediaOutletRepository>();
//    builder.Services.AddSingleton(dataContext);
/* end of json test data concerns */
builder.Services.AddDbContext<MediaHubContext>(options =>
    options
    .UseSqlServer(builder.Configuration.GetConnectionString("MediaHubContext") ?? throw new InvalidOperationException("Connection string 'Service_BillingContext' not found.")
    , o => o.UseCompatibilityLevel(120))); // "use compatibility" was added to deal with problems that arose when upgrading to .Net 8.0


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<MediaHubContext>();
    await context.Database.MigrateAsync();
}

// Other service registrations...

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
