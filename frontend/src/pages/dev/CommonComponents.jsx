import { useState } from "react";
import {
  Plus,
  User,
  Mail,
  Lock,
  Phone,
  Globe,
} from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Avatar from "../../components/common/Avatar";
import Rating from "../../components/common/Rating";
import Modal from "../../components/common/Modal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import Pagination from "../../components/common/Pagination";
import SearchInput from "../../components/common/SearchInput";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Toast from "../../components/common/Toast";

const selectOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "buyer", label: "Buyer" },
  { value: "admin", label: "Admin" },
];

const sectionClass = "mb-12";
const headingClass =
  "text-2xl font-bold text-text mb-6 pb-2 border-b border-border";

const CommonComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [rating, setRating] = useState(4);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t !== id));
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setIsConfirmOpen(false);
      addToast("success", "Confirmed", "Action completed successfully.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            AgriTrust Common Components
          </h1>
          <p className="text-muted">
            Reusable component playground for visual testing.
          </p>
        </header>

        {/* Button */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Button</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary" leftIcon={Plus} iconPosition="left">
              With Left Icon
            </Button>
            <Button variant="outline" rightIcon={User}>
              Right Icon
            </Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" loading />
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" to="/">
              Router Link
            </Button>
          </div>
        </section>

        {/* Input */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Input</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Jane Doe"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              leftIcon={Mail}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              rightIcon={Lock}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              leftIcon={Phone}
            />
            <Input
              label="Website"
              name="website"
              type="url"
              placeholder="https://example.com"
              leftIcon={Globe}
            />
            <Input
              label="Date"
              name="date"
              type="date"
            />
            <Input
              label="With Error"
              name="errorField"
              placeholder="Something is wrong"
              error="This field is required"
            />
            <Input
              label="With Helper Text"
              name="helperField"
              placeholder="Helper text below"
              helperText="Enter a value between 0 and 100"
            />
            <div className="md:col-span-2">
              <Input
                label="Disabled Input"
                name="disabledField"
                placeholder="Cannot edit this"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Select */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Select</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Role"
              name="role"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={selectOptions}
              required
            />
            <Select
              label="Category"
              name="category"
              placeholder="Choose a category"
              options={[
                { value: "organic", label: "Organic Produce" },
                { value: "conventional", label: "Conventional" },
                { value: "specialty", label: "Specialty Crop" },
              ]}
            />
            <Select
              label="With Error"
              name="status"
              options={selectOptions}
              error="Please select a role"
            />
            <Select
              label="With Helper Text"
              name="region"
              options={[
                { value: "north", label: "North America" },
                { value: "south", label: "South America" },
                { value: "europe", label: "Europe" },
              ]}
              helperText="Select your primary market region"
            />
            <Select
              label="Disabled"
              name="disabledSelect"
              options={selectOptions}
              disabled
            />
          </div>
        </section>

        {/* Card */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Product Overview" description="Organic tomatoes from local farm" padding="lg">
              <p className="text-sm text-muted">
                Fresh, locally grown tomatoes harvested this morning.
              </p>
            </Card>

            <Card
              title="Stats"
              subtitle="Last 30 days"
              headerAction={
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              }
              footer={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              }
            >
              <div className="space-y-2">
                <p className="text-2xl font-bold text-text">$1,250</p>
                <p className="text-sm text-muted">Total revenue</p>
              </div>
            </Card>

            <Card variant="outline" title="Outlined Card" padding="md">
              <p className="text-sm text-muted">Using the outline variant.</p>
            </Card>

            <Card variant="elevated" title="Elevated Card" padding="sm">
              <p className="text-sm text-muted">Using the elevated variant.</p>
            </Card>
          </div>
        </section>

        {/* Badge */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Badge</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="verified">Verified</Badge>
            <Badge variant="pending">Pending</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="success" dot>
              Verified
            </Badge>
            <Badge variant="warning" dot>
              Pending
            </Badge>
            <Badge variant="danger" dot>
              Rejected
            </Badge>
          </div>
        </section>

        {/* Avatar */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Avatar</h2>
          <div className="flex flex-wrap items-center gap-6">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5654abf310d1?w=64&h=64&fit=crop"
              alt="User avatar"
              size="xl"
            />
            <Avatar name="Jane Doe" size="lg" />
            <Avatar name="John Smith" size="md" />
            <Avatar name="Jane Doe" size="sm" />
            <Avatar name="AB" size="xl" status="online" />
            <Avatar name="CD" size="lg" status="offline" />
            <Avatar name="EF" size="md" status="busy" />
            <Avatar name="GH" size="md" status="away" />
          </div>
        </section>

        {/* Rating */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Rating</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Rating rating={4.5} readOnly />
              <Rating rating={3.0} readOnly />
              <Rating rating={5} readOnly />
              <Rating rating={2.5} readOnly size="lg" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Rating rating={4.5} showValue reviewCount={32} />
              <Rating rating={3.8} showValue reviewCount={16} size="lg" />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text">
                Interactive (current: {rating}/5):
              </span>
              <Rating
                rating={rating}
                readOnly={false}
                onRate={setRating}
                showValue
              />
            </div>
          </div>
        </section>

        {/* Modal */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Modal</h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="AgriTrust Confirmation"
            size="md"
          >
            <p className="text-sm text-muted">
              This is a modal dialog. You can close it by clicking the X
              button, clicking the backdrop, or pressing Escape.
            </p>
          </Modal>
        </section>

        {/* LoadingSpinner */}
        <section className={sectionClass}>
          <h2 className={headingClass}>LoadingSpinner</h2>
          <div className="flex flex-wrap items-center gap-6">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="md" text="Loading data..." />
            <LoadingSpinner size="md" variant="muted" />
            <LoadingSpinner size="lg" fullScreen text="Loading AgriTrust..." />
          </div>
        </section>

        {/* EmptyState */}
        <section className={sectionClass}>
          <h2 className={headingClass}>EmptyState</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              title="No products yet"
              description="You haven't added any products to your catalog."
            />
            <EmptyState
              title="No favorites"
              description="You haven't saved any products to your favorites."
              actionLabel="Browse Products"
              onAction={() => addToast("info", "Navigate", "This would navigate to products.")}
            />
          </div>
        </section>

        {/* ErrorState */}
        <section className={sectionClass}>
          <h2 className={headingClass}>ErrorState</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ErrorState
              title="Something went wrong"
              message="We couldn't load your products. Please try again."
              onRetry={() => addToast("info", "Retry", "Retry clicked.")}
            />
            <ErrorState
              description="Using description prop instead of message."
              onRetry={() => {}}
            />
          </div>
        </section>

        {/* Pagination */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Pagination</h2>
          <div className="mb-4">
            <p className="text-sm text-muted mb-2">
              Current page: {currentPage}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={12}
              onPageChange={setCurrentPage}
            />
          </div>
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={() => {}}
          />
          <div className="mt-4">
            <Pagination
              currentPage={5}
              totalPages={5}
              onPageChange={() => {}}
              disabled
            />
          </div>
        </section>

        {/* SearchInput */}
        <section className={sectionClass}>
          <h2 className={headingClass}>SearchInput</h2>
          <div className="space-y-4">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
              placeholder="Search products, farmers, buyers..."
            />
            <SearchInput
              value=""
              onChange={() => {}}
              placeholder="Disabled search"
              disabled
            />
          </div>
        </section>

        {/* ConfirmDialog */}
        <section className={sectionClass}>
          <h2 className={headingClass}>ConfirmDialog</h2>
          <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
            Delete Product
          </Button>
          <ConfirmDialog
            open={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            title="Delete Product?"
            description="This action cannot be undone. The product will be permanently removed."
            onConfirm={handleConfirm}
            confirmLabel="Delete"
            cancelLabel="Cancel"
            variant="danger"
            loading={confirmLoading}
          />
        </section>

        {/* Toast */}
        <section className={sectionClass}>
          <h2 className={headingClass}>Toast</h2>
          <p className="text-sm text-muted mb-4">
            Click buttons to trigger toasts (auto-dismiss after 5s).
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="success"
              size="sm"
              onClick={() =>
                addToast("success", "Success", "Operation completed successfully.")
              }
            >
              Success
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                addToast("error", "Error", "Something went wrong. Please try again.")
              }
            >
              Error
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addToast("warning", "Warning", "This action may have side effects.")
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addToast("info", "Info", "New updates are available.")
              }
            >
              Info
            </Button>
          </div>
        </section>
      </div>

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-80">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={5000}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default CommonComponents;
