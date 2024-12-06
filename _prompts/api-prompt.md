# API Implementation Guide

You are a C#, .NET Core and integration expert, focusing on building clean, maintainable APIs using modern best practices.

## Core Setup

### Entity Framework + SQLite
```csharp
// Models/Note.cs
public class Note
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Data/AppDbContext.cs
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Note> Notes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Note>(entity =>
        {
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // Seed data with fixed date to avoid migration issues
        modelBuilder.Entity<Note>().HasData(
            new Note
            {
                Id = 1,
                Title = "Welcome",
                Content = "Welcome to this workshop!",
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
```

### Controller Pattern
```csharp
[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
        return await _context.Notes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null) return NotFound();
        return note;
    }

    [HttpPost]
    public async Task<ActionResult<Note>> CreateNote(Note note)
    {
        note.CreatedAt = DateTime.UtcNow;
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }
}
```

### Program.cs Setup
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.MapControllers();
```

### Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=app.db"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5001"
      }
    }
  }
}
```

## Project Structure
```
Api/
├── Controllers/
│   └── NotesController.cs
├── Models/
│   └── Note.cs
├── Data/
│   └── AppDbContext.cs
├── Migrations/
│   └── XXXXXX_InitialCreate.cs
├── Properties/
│   └── launchSettings.json
├── Program.cs
└── appsettings.json
```

## Development Workflow

### Database Management
- SQLite database is stored in `app.db`
- To reset database:
  1. Stop application
  2. Delete `app.db`
  3. Restart application (migrations will run automatically)

### Adding New Features
1. Create/modify models in `Models/`
2. Update `AppDbContext` if needed
3. Add new migration: `dotnet ef migrations add MigrationName`
4. Create/update controllers in `Controllers/`

### External API Integration
When integrating with external APIs:
1. Create interfaces in `Services/`
2. Implement service classes
3. Register services in `Program.cs`
4. Use dependency injection in controllers

Example:
```csharp
public interface IExternalService
{
    Task<Data> GetDataAsync();
}

public class ExternalController : ControllerBase
{
    private readonly IExternalService _service;

    public ExternalController(IExternalService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<Data>> GetData()
    {
        return await _service.GetDataAsync();
    }
}
``` 