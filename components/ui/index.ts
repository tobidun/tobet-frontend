// components/ui/index.ts
// Design system primitives and shadcn/ui re-exports.

// Typography
export {
  Text,
  Hero,
  Display,
  H1,
  H2,
  H3,
  H4,
  Title,
  Body,
  BodySmall,
  Caption,
  Label,
  Overline,
} from "./typography";

export type { TextProps } from "./typography";

// Layout
export { Container } from "./container";
export type { ContainerProps } from "./container";

export { Stack } from "./stack";
export type { StackProps } from "./stack";

export { Grid, gridVariants } from "./grid";
export type { GridProps, ColsValue } from "./grid";

// Surfaces
export { Surface } from "./surface";
export type { SurfaceProps } from "./surface";

// Dividers
export { Separator } from "./separator";
export type { SeparatorProps } from "./separator";

// Icons
export { IconWrapper } from "./icon-wrapper";
export type { IconWrapperProps } from "./icon-wrapper";

// Buttons
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

// Inputs
export { Input, inputVariants } from "./input";
export type { InputProps } from "./input";

export { TextInput } from "./input";

export { PasswordInput } from "./input";

export { SearchInput } from "./input";

export { NumberInput } from "./input";

export { OTPInput, slotVariants } from "./input";
export type { OTPInputProps } from "./input";

export { Textarea, textareaVariants } from "./input";
export type { TextareaProps } from "./input";

// Form Controls
export { Checkbox, checkboxVariants } from "./form";
export type { CheckboxProps } from "./form";

export { Radio, radioVariants } from "./form";
export type { RadioProps } from "./form";

export { Switch, switchTrackVariants } from "./form";
export type { SwitchProps } from "./form";

export { Select, selectVariants } from "./form";
export type { SelectProps } from "./form";

// Feedback
export { Badge, badgeVariants } from "./feedback";
export type { BadgeProps } from "./feedback";

export { Alert, alertVariants } from "./feedback";
export type { AlertProps } from "./feedback";

export { Spinner, spinnerVariants } from "./feedback";
export type { SpinnerProps } from "./feedback";

export { Skeleton, skeletonVariants } from "./feedback";
export type { SkeletonProps } from "./feedback";

export { Progress, progressVariants, indicatorVariants } from "./feedback";
export type { ProgressProps } from "./feedback";

export { EmptyState, emptyVariants } from "./feedback";
export type { EmptyStateProps } from "./feedback";

export { ErrorState, errorVariants } from "./feedback";
export type { ErrorStateProps } from "./feedback";

export { LoadingOverlay, overlayVariants } from "./feedback";
export type { LoadingOverlayProps } from "./feedback";

export { Toast } from "./feedback";

// Navigation
export { Dropdown, dropdownVariants } from "./navigation";
export type { DropdownProps } from "./navigation";

export { Tooltip } from "./navigation";
export type { TooltipProps } from "./navigation";

export { Accordion, AccordionItem } from "./navigation";
export type { AccordionProps, AccordionItemProps } from "./navigation";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./navigation";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./navigation";

export { Breadcrumb, breadcrumbVariants } from "./navigation";
export type { BreadcrumbProps } from "./navigation";

export { Pagination, paginationVariants } from "./navigation";
export type { PaginationProps } from "./navigation";

// Overlay
export { Modal, modalVariants } from "./overlay";
export type { ModalProps } from "./overlay";

export { Drawer, drawerVariants } from "./overlay";
export type { DrawerProps } from "./overlay";

export { Dialog } from "./overlay";
export type { DialogProps } from "./overlay";

export { ConfirmDialog } from "./overlay";
export type { ConfirmDialogProps } from "./overlay";

// Data Display
export { Avatar, AvatarGroup, avatarVariants } from "./data-display";
export type { AvatarProps, AvatarGroupProps } from "./data-display";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  tableVariants,
  headerCellVariants,
  cellVariants,
} from "./data-display";
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./data-display";

export { StatCard, statCardVariants } from "./data-display";
export type { StatCardProps } from "./data-display";

export { KeyValue, KeyValueList, keyValueVariants } from "./data-display";
export type { KeyValueProps, KeyValueListProps } from "./data-display";

export { Timeline, TimelineItem, timelineVariants } from "./data-display";
export type { TimelineProps, TimelineItemProps } from "./data-display";

export { DescriptionList, descriptionListVariants } from "./data-display";
export type { DescriptionListProps } from "./data-display";
