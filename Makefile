default:
	@echo "Available commands:"
	@echo "  make run"

run:
	cd public && python3 -m http.server 8000

.SILENT: default run