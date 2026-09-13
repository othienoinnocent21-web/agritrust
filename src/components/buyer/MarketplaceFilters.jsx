import { Search, X, Grid3x3, List } from "lucide-react";
import Select from "../common/Select";
import Badge from "../common/Badge";
import Button from "../common/Button";

const MarketplaceFilters = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  region,
  onRegionChange,
  sortBy,
  onSortChange,
  viewMode,
  onToggleView,
  categories,
  regions,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-4">
      <div className="hidden lg:flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search produce, crop type, or farm name..."
            className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
            >
              <X className="w-3 h-3 text-muted" />
            </button>
          )}
        </div>

        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categories}
          placeholder="All Categories"
          className="min-w-[180px]"
          selectClassName="py-2.5 text-sm"
        />

        <Select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          options={regions}
          placeholder="All Regions"
          className="min-w-[160px]"
          selectClassName="py-2.5 text-sm"
        />

        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={[
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "newest", label: "Most Recent" },
            { value: "rated", label: "Highest Rated" },
          ]}
          placeholder="Sort By"
          className="min-w-[170px]"
          selectClassName="py-2.5 text-sm"
        />

        <div className="flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => onToggleView("grid")}
            className={`p-2.5 transition-colors ${
              viewMode === "grid" ? "bg-primary text-white" : "bg-white text-muted hover:bg-gray-50"
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleView("list")}
            className={`p-2.5 transition-colors ${
              viewMode === "list" ? "bg-primary text-white" : "bg-white text-muted hover:bg-gray-50"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} leftIcon={X}>
            Clear All
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-xs text-muted font-medium">Active filters:</span>
          {searchTerm && (
            <Badge variant="info" size="sm" className="gap-1">
              Search: {searchTerm}
              <button onClick={() => onSearchChange("")} className="ml-1 hover:text-blue-700">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {category && category !== "All Categories" && (
            <Badge variant="primary" size="sm" className="gap-1">
              {category}
              <button onClick={() => onCategoryChange("All Categories")} className="ml-1 hover:text-primary">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {region && region !== "All Regions" && (
            <Badge variant="secondary" size="sm" className="gap-1">
              {region}
              <button onClick={() => onRegionChange("All Regions")} className="ml-1 hover:text-secondary">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {sortBy && sortBy !== "newest" && (
            <Badge variant="default" size="sm" className="gap-1">
              Sort: {sortBy === "price-asc" ? "Price up" : sortBy === "price-desc" ? "Price down" : sortBy === "rated" ? "Top Rated" : sortBy}
              <button onClick={() => onSortChange("newest")} className="ml-1 hover:text-gray-700">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="ml-auto">
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarketplaceFilters;
